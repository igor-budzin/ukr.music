import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ReactPlaceholder from 'react-placeholder';
// Components
import PlayListFull from 'universal/components/AudioList/PlayListFull';
import InfinityLoaderSVG from 'universal/components/Commons/InfinityLoaderSVG';
// Actions
import { getArtistAudio } from './ArtistProfileActions';
import { getMusicList } from 'universal/redux/actions/musicDataActions';

const mapStateToProps = state => ({
  artist: state.ArtistProfileReducer.artist,
  artistAudioList: state.ArtistProfileReducer.artistAudioList,
  hasNextPage: state.getMusicReducer.hasNextPage,
  currentMusic: state.controlMusicReducer.currentMusic,
  currentPlaylist: state.controlMusicReducer,
  isPlaying: state.controlMusicReducer.isPlaying,
  isLoading: state.controlMusicReducer.isLoading,
  currentUserId: state.AuthReducer.user.id
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getArtistAudio
  }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ArtistAudio extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      audioListReady: false,
      page: 1,
    }
  }

  componentDidMount() {
    this.props.getArtistAudio({
      alias: this.props.artistAlias,
      callback: () => this.setState({
        audioListReady: true,
        page: this.state.page + 1
      })
    });
  }

  render() {
    return(
      <ReactPlaceholder
        showLoadingAnimation
        ready={this.state.audioListReady}
        customPlaceholder={<InfinityLoaderSVG style={{'marginTop': '40px', 'width': '240px'}} />}
      >
        {this.props.artistAudioList && this.props.artistAudioList.length > 0 ?
          <PlayListFull
            currentId={this.props.currentMusic._id}
            playlist={this.props.artistAudioList}
            handleChoseAudio={this.props.handleChoseAudio}
            handleEditAudio={this.handleEditAudio}
            handleGetPlaylists={this.handleGetPlaylists}
            isPlaying={this.props.isPlaying}
            isLoading={this.props.isLoading}
            hasNextPage={this.props.hasNextPage}
            loadNextPage={this.getPageData}
            isNextPageLoading={false}
          /> : <div></div>}
      </ReactPlaceholder>
    )
  }
}

ArtistAudio.propTypes = {
  artistAlias: PropTypes.string.isRequired
};