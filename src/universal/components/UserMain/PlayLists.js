// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactModal from 'react-modal';
import { Redirect } from 'react-router';
import classNames from 'classnames';
import api from 'universal/utils/api';
// Components
import Button from 'universal/components/Commons/Button';
import Select from 'universal/components/Commons/Select';
// Actions
// import { getMusicListAction } from 'universal/redux/actions/getMusicListActions';
// import * as AudioActions from 'universal/redux/actions/controlMusicActions';

const mapStateToProps = (state, props) => ({
  currentUserId: state.AuthReducer.user.id
});

@connect(mapStateToProps)
export default class PlayLists extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showModal: false,
      title: '',
      playlists: [],
      redirectToPlaylist: false,
      playlistId: '',
      coverImage: ''
    }
  }

  componentDidMount() {
    ReactModal.setAppElement(document.getElementById('root'));
    this.getPlayLists();
  }

  getPlayLists = () => {
    api.request({
      method: 'get',
      path: '/playlist',
      data: {
        userId: this.props.currentUserId
      },
      handleSuccess: data => {
        this.setState({
          playlists: data
        })
      }
    });
  }

  onOpenModal = () => {
    this.setState({ showModal: true });
  }

  onCloseModal = () => {
    this.setState({
      showModal: false,
      title: '',
      coverImage: ''
    });
  }

  handleCreatePlaylist = () => {
    const data = new FormData();

    data.append('currentUserId', this.props.currentUserId);
    data.append('title', this.state.title);
    data.append("files", document.getElementById('file').files[0]);
    // console.log(data);
    api.request({
      method: 'post',
      path: '/playlist',
      data,
      handleSuccess: (data, status) => {
        if(status === 200) {
          this.getPlayLists();
        }
        this.onCloseModal();
      }
    });
  }

  onChooseAlbum(id, event) {
    event.stopPropagation();
    this.setState({
      playlistId: id,
      redirectToPlaylist: true
    })
  }

  onAddImage = event => {
    if(event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = event => {
        this.setState({ coverImage: event.target.result })
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onEditAlbum = (event) => {
    event.stopPropagation();
    console.log('onEditAlbum')
  }

  render() {
    if(this.state.redirectToPlaylist) return (
      <Redirect to={`/playlist/${this.state.playlistId}`} />
    )

    return (
      <div className="play-lists">
        <div className="playlist" id="new-playlist" onClick={this.onOpenModal}>
          <div className="cover"></div>
          <div className="playlist-name">Новий список відтворення</div>
        </div>
        {this.state.playlists.map((item, index) => {
          return(
            <div 
              className="playlist"
              key={item._id + index}
            >
              <div
                className={classNames({
                  'cover': true,
                  'empty': !item.cover
                })}
                onClick={(e) => this.onChooseAlbum(item._id, e)}
              >
                <div className="bg">
                  <div className="btn play"></div>
                  <div className="btn edit" onClick={this.onEditAlbum}></div>
                  <span className="count">Треків: {item.audioCount}</span>
                </div>
                {item.cover && (
                  <img src={`http://localhost:8080/api/cover/playlist/${item.cover}`} />
                )}
              </div>
              <div className="playlist-name">{item.title}</div>
            </div>
          )
        })}
        <ReactModal
          isOpen={this.state.showModal}
          className="modal create-playlist"
          overlayClassName="overlay"
        >
          <div className="title">
            Створення плейлиста
            <div className="close" onClick={this.onCloseModal}></div>
          </div>

          <div className="desc">
            <div className="media-wrapper">
              <div className="media-left">
                <div
                  className="cover empty"
                  onClick={() => document.getElementById('file').click()}
                >
                  <div className="bg">
                    <div className="btn-add-image"></div>
                  </div>
                  <img
                    src={
                      this.state.coverImage ? this.state.coverImage :
                      "http://localhost:8080/api/albumCover/thehardkiss-album.jpg"
                    }
                    id="cover-image"
                  />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    style={{display: 'none'}}
                    onChange={e => this.onAddImage(e)}
                  />
                </div>
              </div>

              <div className="media-right">
                <div className="input-wrapper">
                  <label htmlFor="title">Назва</label>
                  <input
                    type="text"
                    className="input"
                    id="title"
                    value={this.state.title}
                    onChange={e => this.setState({ title: e.target.value })}
                  />
                </div>

                <div className="input-wrapper">
                  <input type="checkbox" id="privat" />
                  <label htmlFor="privat" className="label-checkbox">Приватний</label>
                </div>
              </div>
            </div>

            <div className="devider"></div>

            <div className="input-wrapper">
              <Button className="red right" onClick={this.handleCreatePlaylist}>Зберегти</Button>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}
