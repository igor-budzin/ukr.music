// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationContainer, NotificationManager } from "react-light-notifications";
import ReactPlaceholder from 'react-placeholder';
import api from 'universal/utils/api';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// Components
import InfinityLoaderSVG from 'universal/components/Commons/InfinityLoaderSVG';
import withPlayerFunctional from 'universal/HOC/withPlayerFunctional';
import AudioListFull from 'universal/components/AudioList/AudioListFull';
import EmptyPlayList from 'universal/components/AudioList/EmptyPlayList';
import MusicPlayerContainer from 'universal/components/Player/MusicPlayerContainer';
import SearchField from 'universal/components/SearchField';
import PlayLists from './PlayLists';
// Actions
import { getMusicListAction } from 'universal/redux/actions/getMusicListActions';

const mapStateToProps = state => ({
  audioList: state.getMusicReducer.music,
  hasNextPage: state.getMusicReducer.hasNextPage,
  currentMusic: state.controlMusicReducer.currentMusic,
  isPlaying: state.controlMusicReducer.isPlaying,
  isLoading: state.controlMusicReducer.isLoading,
  currentUserName: state.AuthReducer.user.name,
  currentUserId: state.AuthReducer.user.id,
  visibleUserId: state.visibleUserDataReducer.id
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getMusic: getMusicListAction }, dispatch);
};

class UserProfileContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.tabIndexes = {
      tracks: 0,
      albums: 1,
      playlists: 2,
      history: 3
    };

    this.state = {
      audioListReady: false,
      audioDataReady: false,
      page: 1
    }
  }

  componentDidMount() {
    this.getPageData();
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

  handleAddToUser = (id) => {
    console.log('handleAddToUser')
  }

  onSelectTab = index => {
    localStorage.setItem('Tab-UserMainPage', index);
  }

  onChoseAudio = audioData => {
    this.props.handleChoseAudio(audioData, this.props.audioList);
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
              <ReactPlaceholder
                showLoadingAnimation
                ready={this.state.audioListReady}
                customPlaceholder={<InfinityLoaderSVG style={{'marginTop': '40px', 'width': '240px'}} />}
              >
                {
                  this.props.audioList && this.props.audioList.length > 0 ?
                  <AudioListFull
                    currentId={this.props.currentMusic._id}
                    isPlaying={this.props.isPlaying}
                    isLoading={this.props.isLoading}
                    audioList={this.props.audioList}
                    onChoseAudio={this.onChoseAudio}
                    handleGetPlaylists={this.props.handleGetPlaylists}
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


        <NotificationContainer />
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withPlayerFunctional(UserProfileContainer));