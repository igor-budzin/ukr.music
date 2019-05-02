// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationContainer, NotificationManager } from "react-light-notifications";
import ReactPlaceholder from 'react-placeholder';
import ReactModal from 'react-modal';
import api from 'universal/utils/api';
import { Link } from 'react-router-dom';
// Components
import withPlayerFunctional from 'universal/HOC/withPlayerFunctional';
import AudioListFull from 'universal/components/AudioList/AudioListFull';
import MusicPlayerContainer from 'universal/components/Player/MusicPlayerContainer';
import SearchField from 'universal/components/SearchField';
// Actions
import { getMusicList } from 'universal/redux/actions/musicDataActions';

const mapStateToProps = state => ({
  audioList: state.getMusicReducer.music,
  hasNextPage: state.getMusicReducer.hasNextPage,
  currentMusic: state.controlMusicReducer.currentMusic,
  currentPlaylist: state.controlMusicReducer,
  isPlaying: state.controlMusicReducer.isPlaying,
  isLoading: state.controlMusicReducer.isLoading,
  currentUserId: state.AuthReducer.user.id
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getMusicList }, dispatch);
};

class MusicListContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      audioListReady: false,
      page: 1,
      isOpenModalPlaylist: false,
      dataPlaylist: [],
      idAudioForPlaylist: ''
    }
  }

  componentDidMount() {
    const { getMusicList } = this.props;

    const callback = res => {
      this.setState({
        audioListReady: true
      });
    }

    getMusicList({ 
      limit: 50,
      sortBy: 'listenCount',
      callback
    })

    ReactModal.setAppElement(document.getElementById('root'));
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.locationPath !== prevProps.locationPath
      || this.props.locationParams.id !== prevProps.locationParams.id) {
      this.getPageData();
    }
  }

  getPageData = () => {
    this.props.getMusic(this.props.locationParams.id, this.state.page)
    .then(response => {
      this.setState({
        audioListReady: true,
        page: this.state.page + 1
      });
    })
    .catch(error => {
      NotificationManager.error({
        title: 'Помилка',
        message: 'На жаль під час завантаження аудіофайлів сталася помилка',
        timeOut: 10000
      });
    })
  };

  handleEditAudio = (id) => {

  }

  handleGetPlaylists = id => {
    api.request({
      path: '/playlist',
      data: {
        userLogin: this.props.currentUserId
      },
      handleSuccess: data => {
        this.setState({
          isOpenModalPlaylist: true,
          dataPlaylist: data.playlists,
          idAudioForPlaylist: id
        });
      }
    });
  }

  handleAddToPlaylist = playlistId => {
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

  onCloseModalPlaylist = () => {
    this.setState({
      isOpenModalPlaylist: false,
      dataPlaylist: [],
      idAudioForPlaylist: ''
    });
  }

  onSelectTab = index => {
    localStorage.setItem('Tab-UserMainPage', index);
  }

  render() {
    const { dataPlaylist } = this.state;
    return (
      <Fragment>
        <h2 className="section-title">
          <Link className="btn-back" to="/"></Link>
          Набувають популярності
        </h2>

        <div className="container clearfix">
          <MusicPlayerContainer />
        </div>

        <div className="filter-hr"></div>

        <div className="content">

          <div style={{"margin": "0 0 30px 0"}}>
            <SearchField />
          </div>

          <ReactPlaceholder showLoadingAnimation ready={this.state.audioListReady} customPlaceholder={musicLoader}>
            {
              this.props.audioList && this.props.audioList.length > 0 ?
              <AudioListFull
                currentId={this.props.currentMusic._id}
                audioList={this.props.audioList}
                onChoseAudio={audioData => this.props.handleChoseAudio(audioData, this.props.audioList)}
                handleEditAudio={this.handleEditAudio}
                handleGetPlaylists={this.handleGetPlaylists}
                isPlaying={this.props.isPlaying}
                isLoading={this.props.isLoading}
                hasNextPage={this.props.hasNextPage}
                loadNextPage={this.getPageData}
                isNextPageLoading={false}
              /> : <div></div>
            }
          </ReactPlaceholder>
        </div>


        <ReactModal
          isOpen={this.state.isOpenModalPlaylist}
          className="modal edit-audio"
          overlayClassName="overlay"
        >
          <div className="title">
            Виберіть плейлист із списку
            <div className="close" onClick={this.onCloseModalPlaylist}></div>
          </div>

          <div className="desc playlist-list">
            {
              dataPlaylist.length && (dataPlaylist.map((item, index) => {
                return (
                  <div
                    className="playlist-item"
                    onClick={this.handleAddToPlaylist.bind(null, item._id)}
                    key={item._id + index}
                  >
                    {item.title}
                  </div>
                )
              }))
            }

            {
              (dataPlaylist.length === 0) && (
                <p>У вас поки немаэ жодного плейлиста</p>
              )
            }
          </div>
        </ReactModal>


        <NotificationContainer />
      </Fragment>
    );
  }
}

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
            d="       M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1         c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z" />
    </svg>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(withPlayerFunctional(MusicListContainer));