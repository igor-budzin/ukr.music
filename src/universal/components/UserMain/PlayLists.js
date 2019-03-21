// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactModal from 'react-modal';
import axios from 'axios';
import classNames from 'classnames';
import api from 'universal/utils/api';
import { API_URL } from '../../../global.config';
// Components
import Button from 'universal/components/Commons/Button';
import Select from 'universal/components/Commons/Select';
// Actions
// import { getMusicListAction } from 'universal/redux/actions/getMusicListActions';
// import * as AudioActions from 'universal/redux/actions/controlMusicActions';

const mapStateToProps = (state, props) => ({
  currentUserName: state.AuthReducer.user.name
});

const mapDispatchToProps = (dispatch, props) =>  bindActionCreators({}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class UserProfiletContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showModal: false,
      title: '',
      playlists: []
    }
  }

  componentDidMount() {
    ReactModal.setAppElement(document.getElementById('root'));

    axios({
      method: 'get',
      url: `${API_URL}/playlist`,
      params: {
        userName: this.props.currentUserName
      }
    })
    .then(response => {
      this.setState({
        playlists: response.data.playlists
      })
    })
    .catch(err => console.log(err));
  }

  onOpenModal = () => {
    this.setState({ showModal: true });
  }

  onCloseModal = () => {
    this.setState({ showModal: false });
  }

  handleCreatePlaylist = () => {
    api.request({
      method: 'post',
      path: '/playlist',
      data: {
        userName: this.props.currentUserName,
        title: this.state.title
      },
      handleSuccess: (data, status) => {
        if(status === 200) this.onCloseModal();
      }
    });
  }

  render() {
    return (
      <div className="play-lists">
        <div className="playlist" id="new-playlist" onClick={this.onOpenModal}>
          <div className="cover">
          </div>
          <div className="playlist-name">Новий список відтворення</div>
        </div>
        {
          this.state.playlists.map(item => {
            return(
              <div className="playlist">
                <div className="cover empty">
                  <div className="bg">
                    <div className="btn play"></div>
                    <div className="btn edit"></div>
                    <span className="count">25 треків</span>
                  </div>
                  <img src="https://localhost:8080/api/albumCover/thehardkiss-album.jpg" alt=""/>
                </div>
                <div className="playlist-name">{item.title}</div>
              </div>
            )
          })
        }
{/*        <div className="playlist">
          <div className="cover">
            <div className="bg"></div>
            <img src="https://localhost:8080/api/albumCover/thehardkiss-album.jpg" alt=""/>
          </div>
          <div className="playlist-name">Релакс</div>
        </div>
*/}


        <ReactModal
          isOpen={this.state.showModal}
          onAfterOpen={this.handleOpenEditModal}
          className="modal create-playlist"
          overlayClassName="overlay"
        >
          <div className="title">
            Створення плейлиста
            <div className="close" onClick={this.onCloseModal}></div>
          </div>

          <div className="desc">
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
              <Button className="red" onClick={this.handleCreatePlaylist}>Зберегти</Button>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}
