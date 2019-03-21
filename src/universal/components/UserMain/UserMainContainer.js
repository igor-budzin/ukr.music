// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationContainer, NotificationManager } from "react-light-notifications";
import ReactPlaceholder from 'react-placeholder';
import ReactModal from 'react-modal';
import api from 'universal/utils/api';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { API_URL } from '../../../global.config';
// Components
import MusicFilter from 'universal/components/MusicFilter';
import PlayListFull from 'universal/components/PlayList/PlayListFull';
import EmptyPlayList from 'universal/components/PlayList/EmptyPlayList';
import MusicPlayerContainer from 'universal/components/Player/MusicPlayerContainer';
import SearchField from 'universal/components/SearchField';
import PlayLists from './PlayLists';
import Button from 'universal/components/Commons/Button';
import Select from 'universal/components/Commons/Select';
// Actions
import { getMusicListAction } from 'universal/redux/actions/getMusicListActions';
import * as AudioActions from 'universal/redux/actions/controlMusicActions';

const mapStateToProps = state => ({
  playlist: state.getMusicReducer.music,
  hasNextPage: state.getMusicReducer.hasNextPage,
  currentMusic: state.controlMusicReducer.currentMusic,
  currentPlaylist: state.controlMusicReducer,
  isPlaying: state.controlMusicReducer.isPlaying,
  isLoading: state.controlMusicReducer.isLoading,
  currentUserName: state.AuthReducer.user.name,
  userId: state.AuthReducer.user.id,
  visibleUserName: state.visibleUserDataReducer.name,
  visibleUserID: state.visibleUserDataReducer._id
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...AudioActions, getMusic: getMusicListAction }, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
export default class UserProfiletContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      audioListReady: false,
      audioDataReady: false,
      page: 1,
      isOpenModalPlaylist: false,
      dataPlaylist: [],
      idAudioForPlaylist: ''
    }
  }

  componentDidMount() {
    this.getPageData();
    ReactModal.setAppElement(document.getElementById('root'));
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.locationPath !== prevProps.locationPath
      || this.props.locationParams.name !== prevProps.locationParams.name) {
      this.getPageData();
    }
  }

  getPageData = () => {
    this.props.getMusic(this.props.locationParams.name, this.state.page)
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

  handleChoseAudio = (audioData) => {
    if(this.props.currentMusic.link.length === 0) {
      this.props.playAudio(audioData, this.props.playlist);
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
        this.props.playAudio(audioData, this.props.playlist);
      }
    }
  };

  handleEditAudio = (id) => {

  }

  handleGetPlaylists = id => {
    api.request({
      path: '/playlist',
      data: {
        userName: this.props.currentUserName
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
          {
            this.props.userId !== this.props.visibleUserID && this.props.visibleUserName ?
            this.props.visibleUserName : 'Моя музика'
          }
        </h2>

        <div className="container clearfix">

          <MusicPlayerContainer />

        </div>

        <div className="filter-hr"></div>

        <div className="content">

          <div style={{"margin": "0 0 30px 0"}}>
            <SearchField />
          </div>

          <Tabs
            defaultIndex={parseInt(localStorage.getItem('Tab-UserMainPage'), 10) || 0}
            onSelect={this.onSelectTab}
          >
            <TabList className="section-links" style={{ marginBottom: "40px" }}>
              <Tab className="link" selectedClassName="active">Треки</Tab>
              <Tab className="link" selectedClassName="active">Альбоми</Tab>
              <Tab className="link" selectedClassName="active">Плейлисти</Tab>
              <Tab className="link" selectedClassName="active">Історія</Tab>
            </TabList>

            <TabPanel>
              <ReactPlaceholder showLoadingAnimation ready={this.state.audioListReady} customPlaceholder={musicLoader}>
                {
                  this.props.playlist && this.props.playlist.length > 0 ?
                  <PlayListFull
                    currentId={this.props.currentMusic._id}
                    playlist={this.props.playlist}
                    handleChoseAudio={this.handleChoseAudio}
                    handleEditAudio={this.handleEditAudio}
                    handleGetPlaylists={this.handleGetPlaylists}
                    isPlaying={this.props.isPlaying}
                    isLoading={this.props.isLoading}
                    hasNextPage={this.props.hasNextPage}
                    loadNextPage={this.getPageData}
                    isNextPageLoading={false}
                  /> :
                  <EmptyPlayList />
                }
              </ReactPlaceholder>
            </TabPanel>

            <TabPanel>
              <div className="albums albums-list">
                <div className="album">
                  <img src="https://localhost:8080/api/albumCover/MAXIMALISM.jpg" alt=""/>
                  <div className="album-name">Perfection Is a Lie</div>
                  <div className="album-year">2017</div>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <PlayLists />
            </TabPanel>

            <TabPanel>
              Історія
            </TabPanel>
          </Tabs>

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
                dataPlaylist.map((item, index) => {
                  return (
                    <div
                      className="playlist-item"
                      onClick={this.handleAddToPlaylist.bind(null, item._id)}
                      key={item._id + index}
                    >
                      {item.title}
                    </div>
                  )
                })
              }
            </div>
          </ReactModal>


          <ReactModal
            isOpen={false}
            onAfterOpen={this.handleOpenEditModal}
            className="modal edit-audio"
            overlayClassName="overlay"
          >
            <div className="title">
              Редагування аудіозапису
              <div className="close" onClick={this.handleCloseModal}></div>
            </div>

              <ReactPlaceholder showLoadingAnimation ready={this.state.audioDataReady} customPlaceholder={musicLoader}>
                <div>
                  <div className="cover">
                    <img src="https://localhost:8080/api/albumCover/MAXIMALISM.jpg" />
                    <div className="edit"><span>змінити</span></div>
                  </div>

                  <div className="desc">
                    <div className="input-wrapper">
                      <label htmlFor="edit-artist">Виконавець</label>
                      <input
                        type="text"
                        className="input"
                        id="edit-artist"
                        value={this.state.editField_Artist}
                        onChange={e => this.setState({ editField_Artist: e.target.value })}
                      />
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="edit-title">Назва</label>
                      <input
                        type="text"
                        className="input"
                        id="edit-title"
                        value={this.state.editField_Title}
                        onChange={e => this.setState({ editField_Title: e.target.value })}
                      />
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="edit-genre">Жанр</label>
                      <Select id="edit-genre" options={options} defaultValue="item 2" defaultLabel="2 Item">
                      </Select>
                    </div>

                    <div className="input-wrapper">
                      <Button className="red">Зберегти</Button>
                    </div>
                  </div>
                </div>
              </ReactPlaceholder>
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

const options = [
  {value: 'item 1', label: '1 Item'},
  {value: 'item 2', label: '2 Item'},
  {value: 'item 3', label: '3 Item'},
  {value: 'item 4', label: '4 Item'},
  {value: 'item 1', label: '1 Item'},
  {value: 'item 1', label: '1 Item'},
  {value: 'item 1', label: '1 Item'}
];
