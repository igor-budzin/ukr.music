import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withPlayerFunctional from 'universal/HOC/withPlayerFunctional';
import PlayListFull from 'universal/components/PlayList/PlayListFull';
import Button from 'universal/components/Commons/Button';
// Actions
import { getPlaylist } from './PlayListsActions';

const mapStateToProps = state => ({
  playlist1: state.playlistDataReducer.music,
  hasNextPage: state.playlistDataReducer.hasNextPage,
  currentMusic: state.controlMusicReducer.currentMusic,
  isPlaying: state.controlMusicReducer.isPlaying,
  isLoading: state.controlMusicReducer.isLoading,
  currentUserName: state.AuthReducer.user.name,
  currentUserLogin: state.AuthReducer.user.login,
  userId: state.AuthReducer.user.id,
  visibleUserLogin: state.visibleUserDataReducer.login,
  visibleUserID: state.visibleUserDataReducer._id
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getPlaylist }, dispatch);
};

class PlayListView extends Component {

  componentDidMount() {
    this.getPlaylist();
    console.log(this.props.playlist1)
  }

  getPlaylist = () => {
    this.props.getPlaylist({
      playlistId: this.props.currentPlaylistId,

    })
  }

  render() {
    return (
      <Fragment>
        <div className="media-wrapper playlist-view">
          <div className="media-left">
            <div className="cover empty">
              <div className="bg">
                <div className="btn-add-image"></div>
              </div>
              <img src="http://localhost:8080/api/albumCover/thehardkiss-album.jpg" alt=""/>
            </div>
          </div>

          <div className="media-right">
            <h6>The Hardkiss blabal balbal</h6>
            <p>15 треків &bull; 42 хв</p>

            <div className="options">
              <Button className="mini default">Редагувати</Button>
              <Button className="mini default">Видалити</Button>
            </div>
          </div>
        </div>

         {
          this.props.playlist && this.props.playlist.length > 0 ?
          <PlayListFull
            currentId={this.props.currentMusic._id}
            playlist={this.props.playlist1}
            handleChoseAudio={this.props.handleChoseAudio}
            handleEditAudio={this.handleEditAudio}
            handleGetPlaylists={this.handleGetPlaylists}
            isPlaying={this.props.isPlaying}
            isLoading={this.props.isLoading}
            hasNextPage={this.props.hasNextPage}
            loadNextPage={this.getPlaylist}
            isNextPageLoading={false}
          /> : null
        }
      </Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withPlayerFunctional(PlayListView));