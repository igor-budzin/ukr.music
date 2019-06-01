import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formatSeconds } from 'universal/utils';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import ReactModal from 'react-modal';
import ReactPlaceholder from 'react-placeholder';
import { NotificationContainer, NotificationManager } from "react-light-notifications";

import MusicPlayerContainer from 'universal/components/Player/MusicPlayerContainer';
import withPlayerFunctional from 'universal/HOC/withPlayerFunctional';
import AudioListFull from 'universal/components/AudioList/AudioListFull';
import Button from 'universal/components/Commons/Button';
// Actions
import { getPlaylistAudio, getPlaylistData, deletePlaylist } from './PlayListsActions';

const mapStateToProps = state => ({
  playlist: state.playlistDataReducer,
  hasNextPage: state.playlistDataReducer.hasNextPage,
  currentMusic: state.controlMusicReducer.currentMusic,
  isPlaying: state.controlMusicReducer.isPlaying,
  isLoading: state.controlMusicReducer.isLoading,
  currentUserId: state.AuthReducer.user.id,
  visibleUserID: state.visibleUserDataReducer._id
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getPlaylistAudio, getPlaylistData, deletePlaylist }, dispatch);
};

class PlayListView extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      playlistReady: false,
      showDeleteModal: false,
      redirect: false
    }
  }

  componentDidMount() {
    this.getPlaylist();
  }

  getPlaylist() {
    const { id } = this.props.params;

    this.props.getPlaylistData(id);

    this.props.getPlaylistAudio({
      playlistId: id,
      callback: () => {
        this.setState({ playlistReady: true })
      }
    });

  }

  onChoseAudio = audioData => {
    this.props.handleChoseAudio(audioData, this.props.playlist.music);
  }

  onCloseModalPlaylist = () => {
    this.setState({ showDeleteModal: false })
  }

  handleDeletePlaylist = () => {
    this.props.deletePlaylist({
      playlistId: this.props.params.id,
      callback: () => {
        this.setState({
          redirect: true
        })
      }
    })
  }

  render() {
    const {
      music,
      hasNextPage,
      audioCount,
      cover,
      title,
      duration
    } = this.props.playlist;

    if(this.state.redirect) return <Redirect to={`/profile/${this.props.currentUserId}`} />

    return (
      <Fragment>
        <h2 className="section-title">
          <Link className="btn-back" to={`/profile/${this.props.currentUserId}`}></Link>
          Плейлист
        </h2>

        <div className="container clearfix">
          <MusicPlayerContainer />
        </div>

        <div className="filter-hr"></div>

        <div className="content">
          <div className="media-wrapper playlist-view">
            <div className="media-left">
              <div className="cover empty">
                <div className="bg">
                  <div className="btn-add-image"></div>
                </div>
                {cover && <img src={`http://localhost:8080/api/cover/playlist/${cover}`} />}
              </div>
            </div>

            <div className="media-right">
              <h6>{title}</h6>
              <p>Треків: {audioCount} &nbsp;&bull;&nbsp; {formatSeconds(duration)}</p>

              <div className="options">
                <Button className="mini">Редагувати</Button>
                <Button
                  className="mini"
                  onClick={() => this.setState({ showDeleteModal: true })}
                >
                  Видалити
                </Button>
              </div>
            </div>
          </div>
          <ReactPlaceholder showLoadingAnimation ready={this.state.playlistReady} customPlaceholder={musicLoader}>
             {
              (music && music.length > 0) &&
              <AudioListFull
                currentId={this.props.currentMusic._id}
                audioList={music}
                handleChoseAudio={this.onChoseAudio}
                handleEditAudio={this.handleEditAudio}
                handleGetPlaylists={this.handleGetPlaylists}
                isPlaying={this.props.isPlaying}
                isLoading={this.props.isLoading}
                hasNextPage={hasNextPage}
                loadNextPage={this.getPlaylist}
                isNextPageLoading={false}
              />
            }
          </ReactPlaceholder>
        </div>

        <ReactModal
          isOpen={this.state.showDeleteModal}
          overlayClassName="overlay"
          className="modal delete-playlist__modal"
        >
          <div className="title">
            Видалення плейлиста
            <div className="close" onClick={this.onCloseModalPlaylist}></div>
          </div>

          <div className="desc">
            <p>
              Ви справді хочете видалити плейлист <b>{title}</b>?<br />
              Він <b>зникне</b> у всіх користувачів, які вже додали його собі.
            </p>

            <div className="devider"></div>

            <div className="input-wrapper right">
              <Button className="mini default" onClick={this.onCloseModalPlaylist}>Скасувати</Button>
              <Button className="mini red" onClick={this.handleDeletePlaylist}>Так, видалити</Button>
            </div>
          </div>
        </ReactModal>
        <NotificationContainer />
      </Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withPlayerFunctional(PlayListView));

const svgLoaderStyle = {
  left: '50%',
  top: '50%',
  marginTop: '40px',
  width: '240px',
  position: 'absolute',
  transform: 'translate(-50%, -50%) matrix(1, 0, 0, 1, 0, 0)',
}

const musicLoader = (
  <div style={{position: 'relative'}}>
    <svg viewBox="0 0 187.3 93.7" preserveAspectRatio="xMidYMid meet" style={svgLoaderStyle}>
      <path stroke="#ff4838" id="outline" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" 
            d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1        c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z" />
      <path id="outline-bg" opacity="0.5" fill="none" stroke="#ededed" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" 
            d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1         c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z" />
    </svg>
  </div>
)