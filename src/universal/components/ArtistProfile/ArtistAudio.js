import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ReactPlaceholder from 'react-placeholder';
import ReactModal from 'react-modal';
// Components
import AudioListFull from 'universal/components/AudioList/AudioListFull';
import InfinityLoaderSVG from 'universal/components/Commons/InfinityLoaderSVG';
import withPlayerFunctional from 'universal/HOC/withPlayerFunctional';
import Button from '../Commons/Button';
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

class ArtistAudio extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      audioListReady: false,
      page: 1,
      showModal: false
    }
  }

  componentDidMount() {
    this.getArtistAudio();
  }

  getArtistAudio = () => {
    this.props.getArtistAudio({
      alias: this.props.artistAlias,
      callback: () => this.setState({
        audioListReady: true,
        page: this.state.page + 1
      })
    });
  }

  onChoseAudio = audioData => {
    this.props.handleChoseAudio(audioData, this.props.artistAudioList);
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    return(
      <div style={{"position": 'relative'}}>
        <a className="admin-add-link" onClick={() => this.setState({ showModal: true })}>Завантажити трек</a>
        <ReactPlaceholder
          showLoadingAnimation
          ready={this.state.audioListReady}
          customPlaceholder={<InfinityLoaderSVG style={{'marginTop': '40px', 'width': '240px'}} />}
        >
          {this.props.artistAudioList && this.props.artistAudioList.length > 0 ?
            <AudioListFull
              currentId={this.props.currentMusic._id}
              audioList={this.props.artistAudioList}
              onChoseAudio={this.onChoseAudio}
              handleEditAudio={this.handleEditAudio}
              handleGetPlaylists={this.handleGetPlaylists}
              isPlaying={this.props.isPlaying}
              isLoading={this.props.isLoading}
              hasNextPage={this.props.hasNextPage}
              loadNextPage={this.getArtistAudio}
              isNextPageLoading={false}
            /> : <div></div>}
        </ReactPlaceholder>

        <ReactModal
          isOpen={this.state.showModal}
          className="modal"
          overlayClassName="overlay"
        >
          <div className="title">
            Додати трек
            <div className="close" onClick={this.handleCloseModal}></div>
          </div>


            <div className="devider"></div>

            <div className="input-wrapper">
              <Button className="red">Створити</Button>
            </div>
        </ReactModal>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withPlayerFunctional(ArtistAudio));

ArtistAudio.propTypes = {
  artistAlias: PropTypes.string.isRequired
};