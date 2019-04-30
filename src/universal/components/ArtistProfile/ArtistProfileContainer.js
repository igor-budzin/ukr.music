// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationContainer, NotificationManager } from "react-light-notifications";
import SlickSlider from "react-slick";
// Components
import Button from '../Commons/Button';
import AlbumsSection from 'universal/components/Sections/AlbumsSection';
import TourSection from 'universal/components/Sections/TourSection';
import MusicSection from 'universal/components/Sections/MusicSection';
// Actions
import { getArtistData, getArtistAudio } from './ArtistProfileActions';

const mapStateToProps = state => ({
  artist: state.ArtistProfileReducer.artist,
  artistAudioList: state.ArtistProfileReducer.artistAudioList
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getArtistAudio,
    getArtistData
  }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ArtistProfileContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      
    };
  }

  componentDidMount() {
    const { getArtistData, getArtistAudio, locationParams } = this.props;

    getArtistData(locationParams.id);
    getArtistAudio(locationParams.id);
  }

  render() {
    const { artist, artistAudioList, locationParams } = this.props;

    return (
      <div className="artist-profile">
        <div className="artist-cover">
          {artist.coverHorizontal ?
            <img src={`http://localhost:8080/api/cover/artist/${artist.coverHorizontal}/horizontal`} className="cover-horizontal"/> :
            <div className="default-cover"><span>{artist.name}</span></div>
          }
          <div className="edit-cover"><span>Змінити</span></div>
        </div>
        <main id="page" className="page clearfix">

          <div className="content">

            <div className="artist-title official">
              <span>{artist.name}</span>
              <a href="javascript: void(0);">Редагувати</a>
            </div>

            {!locationParams.mode ? (
              <Fragment>
                <MusicSection
                  title={"ТОП-треки"}
                  data={artistAudioList}
                  fullListLink={`audio/${locationParams.id}`}
                />
                <AlbumsSection />
                <TourSection />
              </Fragment>
            ) : locationParams.mode}


          </div>

          <div className="sidebar">
            <div className="counts sidebar-wrapper">
              <div className="col">
                <span className="text">Підписалось</span>
                <span className="count">20 400</span>
              </div>
              <div className="col">
                <span className="text">Аудіофайлів</span>
                <span className="count">120</span>
              </div>
            </div>

            <div className="sidebar-wrapper">
              <Button className="btn full">Підписатися</Button>
            </div>
          </div>

          <NotificationContainer />
        </main>
      </div>
    );
  }
}