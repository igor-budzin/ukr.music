// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactModal from 'react-modal';
import classNames from 'classnames';
import api from 'universal/utils/api';
import { formatSeconds } from 'universal/utils';
// Actions
import * as AudioActions from 'universal/redux/actions/controlMusicActions';

const mapStateToProps = state => ({
  currentMusic: state.controlMusicReducer.currentMusic,
  isPlaying: state.controlMusicReducer.isPlaying,
  currentUserId: state.AuthReducer.user.id,
});

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators({ ...AudioActions }, dispatch);
};

export default function withPlayerFunctional(PassedComponent) {
  class WithPlayerFunctional extends Component {
    constructor(props, context) {
      super(props, context);

      this.state = {
        isOpenModalPlaylist: false,
        dataPlaylist: [],
        idAudioForPlaylist: '',
      }
    }

    componentDidMount() {
      ReactModal.setAppElement(document.getElementById('root'));
    }

    handleChoseAudio = (audioData, audioList) => {
      if(audioList === undefined) throw new Error('"audioList" is not defined');

      if(this.props.currentMusic.link.length === 0) {
        this.props.playAudio(audioData, audioList);
      }
      else {
        if(this.props.currentMusic.link === audioData.link) {
          if(this.props.isPlaying) {
            this.props.pauseAudio();
          }
          else {
            this.props.playAudio();
          }
        }
        else {
          this.props.playAudio(audioData, audioList);
        }
      }
    }

    handleAddToPlaylist = playlistId => {
      console.log('handleAddToPlaylist')
      api.request({
        method: 'put',
        path: '/playlist',
        data: {
          playlistId,
          audioId: this.state.idAudioForPlaylist
        },
        handleSuccess: (response, status) => {
          if(status === 200) {
            this.setState({
              isOpenModalPlaylist: false,
              dataPlaylist: [],
              idAudioForPlaylist: ''
            });
          }
        }
      });
    }

    handleGetPlaylists = id => {
      console.log('handleGetPlaylists')
      api.request({
        path: '/playlist',
        data: {
          userId: this.props.currentUserId
        },
        handleSuccess: data => {
          this.setState({
            isOpenModalPlaylist: true,
            dataPlaylist: data,
            idAudioForPlaylist: id
          });
        }
      });
    }

    onCloseModalPlaylist = () => {
      console.log('onCloseModalPlaylist')
      this.setState({
        isOpenModalPlaylist: false,
        dataPlaylist: [],
        idAudioForPlaylist: ''
      });
    }

    render() {
      const { dataPlaylist } = this.state;

      return (
        <Fragment>
          <PassedComponent
            {...this.props}
            handleChoseAudio={this.handleChoseAudio}
            handleGetPlaylists={this.handleGetPlaylists}
          />

          <ReactModal
            isOpen={this.state.isOpenModalPlaylist}
            className="modal playlist-list__modal"
            overlayClassName="overlay"
          >
            <div className="title">
              Виберіть плейлист із списку
              <div className="close" onClick={this.onCloseModalPlaylist}></div>
            </div>

            <div className="desc playlist-list">
              {
                dataPlaylist.map((item, index) => {
                  const bgStyle = item.cover ?
                  { 'backgroundImage': `url('http://localhost:8080/api/cover/playlist/${item.cover}')` } : {};

                  return (
                    <div
                      className="playlist-item"
                      onClick={this.handleAddToPlaylist.bind(null, item._id)}
                      key={item._id + index}
                    >
                      <div 
                        className={classNames({
                          'cover': true,
                          'empty': !item.cover 
                        })}
                        style={bgStyle}
                      >
                      </div>
                      <span className="playlist-title">{item.title}</span>
                      <span className="audioCount">Треків: {item.audioCount}</span>
                      <span className="audioDuration">{formatSeconds(item.duration)}</span>
                    </div>
                  )
                })
              }

              {
                (dataPlaylist.length === 0) && (
                  <p>У вас поки немає жодного плейлиста</p>
                )
              }
            </div>
          </ReactModal>
        </Fragment>
      )
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithPlayerFunctional);
}




