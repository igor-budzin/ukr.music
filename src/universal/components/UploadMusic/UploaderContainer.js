// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import { formatBytes } from 'universal/utils';
import io from 'socket.io-client';
import { NotificationContainer, NotificationManager } from "react-light-notifications";
import { globlaConfig as config } from '../../../global.config';
// Components
import Button from 'universal/components/Commons/Button';
// Actions
import * as uploadMusicActions from './uploadMusicActions';

const mapStateToProps = state => ({
  currentUserId: state.AuthReducer.user.id
});

const mapDispatchToProps = dispatch => bindActionCreators(uploadMusicActions, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class UploaderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      uploadedCount: 0,
      isUploading: false
    };
  }

  componentDidMount() {
    this.socket = io(`${config.protocol}://${config.host}:${config.apiPort}`);
    this.socket.on('uploadProgress', this.updateUploadProgress);
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  handleDrop = (acceptedFiles, rejectedFiles) => {
    const arr = this.state.files;
    let count = 0;

    acceptedFiles.map(item => {
      count++;
      if(count < 10) {
        arr.push({
          fileName: item.name,
          size: item.size,
          file: item,
          progress: 0,
          bytesReceived: 0,
          uploaded: false
        });
      }
    });

    this.setState({ files: arr });
  };

  hnadleUpload = () => {
    const { files } =  this.state;

    this.setState({ isUploading: true });

    files.map(file => {
      const data = new FormData();

      data.append('fileName', file.fileName);
      data.append('currentUserId', this.props.currentUserId);
      data.append("files", file.file);

      this.props.requestUploadMusic(data, () => {});
    });
  };

  updateUploadProgress = data => {
    let { files, uploadedCount } = this.state;

    if(files.length) {
      let fileIndex = files.findIndex(item => item.fileName === data.fileName);
      files[fileIndex].progress = data.progress;

      if(data.progress == 100 && !files[fileIndex].uploaded) {
        uploadedCount++;
        files[fileIndex].uploaded = true;

        if(uploadedCount === files.length) {
          this.setState({
            uploadedCount: 0,
            isUploading: false,
            files: []
          });
          NotificationManager.success({
            message: 'аудіофайли успішно завантажені',
            timeOut: 5000
          });
        }
        else {
          this.setState({ uploadedCount });
        }
      };

      this.setState({ files: files });
    }
  };

  render() {
    const files = this.state.files;

    return (
      <div>
        <div className="file-list">
          {
            files.map((item, index) => {
              return (
                <div key={index} className="item">
                  <span className="file-name">{item.fileName}</span>
                  <span className="size">{`${item.progress}%`}</span>

                  <div className="progress">
                    <div className="persent" style={{ width: `${item.progress}%` }}></div>
                  </div>
                </div>
              );
            })
          }
        </div>

        <div className="dropzone-wrapper">
          <form>
            {
              (files.length <= 10 && !this.state.isUploading) && (
                <Dropzone
                  className="dropzone"
                  onDrop={this.handleDrop}
                  maxSize={20000000}
                  accept="audio/*"
                  disabled={this.state.isUploading}
                />
              )
            }
          </form>
        </div>

        {
          files.length > 0 && (
            <Button
              isLoading={this.state.isUploading}
              className="upload"
              onClick={this.hnadleUpload}
            >
              Завантажити
            </Button>
          )
        }
      </div>
    );
  }
}

