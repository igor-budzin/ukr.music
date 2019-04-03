import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formatSeconds } from 'universal/utils';

import withPlayerFunctional from 'universal/HOC/withPlayerFunctional';
import PlayListFull from 'universal/components/PlayList/PlayListFull';
import Button from 'universal/components/Commons/Button';
// Actions
import { getPlaylistAudio, getPlaylistData } from './PlayListsActions';

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
  return bindActionCreators({ getPlaylistAudio, getPlaylistData }, dispatch);
};

class PlayListView extends Component {

  componentDidMount() {
    this.getPlaylist();
  }

  getPlaylist() {
    const { currentPlaylistId } = this.props;

    this.props.getPlaylistAudio({
      playlistId: currentPlaylistId
    });

    this.props.getPlaylistData(currentPlaylistId);
  }

  render() {
    const { music, hasNextPage, audioCount, title, duration } = this.props.playlist;
    console.log(music)
    return (
      <Fragment>
        <div className="media-wrapper playlist-view">
          <div className="media-left">
            <div className="cover empty">
              <div className="bg">
                <div className="btn-add-image"></div>
              </div>
              <img src="http://localhost:8080/api/albumCover/thehardkiss-album.jpg" />
            </div>
          </div>

          <div className="media-right">
            <h6>{title}</h6>
            <p>Треків: {audioCount} &nbsp;&bull;&nbsp; {formatSeconds(duration)}</p>

            <div className="options">
              <Button className="mini default">Редагувати</Button>
              <Button className="mini default">Видалити</Button>
            </div>
          </div>
        </div>

         {
          music && music.length > 0 ?
          <PlayListFull
            currentId={this.props.currentMusic._id}
            playlist={music}
            handleChoseAudio={this.props.handleChoseAudio}
            handleEditAudio={this.handleEditAudio}
            handleGetPlaylists={this.handleGetPlaylists}
            isPlaying={this.props.isPlaying}
            isLoading={this.props.isLoading}
            hasNextPage={hasNextPage}
            loadNextPage={this.getPlaylist}
            isNextPageLoading={false}
          /> : null
        }
      </Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withPlayerFunctional(PlayListView));