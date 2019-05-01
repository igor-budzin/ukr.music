// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationContainer, NotificationManager } from "react-light-notifications";
import SlickSlider from "react-slick";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
// Components
import Button from '../Commons/Button';
import AlbumsSection from 'universal/components/Sections/AlbumsSection';
import TourSection from 'universal/components/Sections/TourSection';
import MusicSection from 'universal/components/Sections/MusicSection';
import ArtistAudio from './ArtistAudio';
// Actions
import { getArtistData, getArtistAudioPart } from './ArtistProfileActions';

const mapStateToProps = state => ({
  artist: state.ArtistProfileReducer.artist,
  artistAudioListPart: state.ArtistProfileReducer.artistAudioListPart
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getArtistAudioPart,
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
    const { getArtistData, getArtistAudioPart, locationParams } = this.props;

    getArtistData(locationParams.alias);
    getArtistAudioPart(locationParams.alias);
  }

  render() {
    const { artist, artistAudioListPart, locationParams } = this.props;

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
              {locationParams.mode && <Link className="btn-back" to={`../${artist.alias}`}></Link>}

              <span>{artist.name}</span>
              <a href="javascript: void(0);">Редагувати</a>
            </div>

            {!locationParams.mode ? (
              <Fragment>
                <MusicSection
                  title={"ТОП-треки"}
                  data={artistAudioListPart}
                  fullListLink={`audio/${locationParams.alias}`}
                />
                <AlbumsSection />
                <TourSection />
              </Fragment>
            ) :
            (
              <ArtistMode
                mode={locationParams.mode}
                artistAlias={locationParams.alias}
              />
            )
          }


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

const ArtistMode = props => {
  switch(props.mode) {
    case 'audio':
      return (
        <ArtistAudio artistAlias={props.artistAlias} />
      );

    case 'album':
      return "album";

    case 'tour':
      return "tour";

    default:
      return <Redirect to="/404" />;
  }
}