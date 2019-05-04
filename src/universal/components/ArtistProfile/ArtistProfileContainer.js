// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationContainer, NotificationManager } from "react-light-notifications";
import SlickSlider from "react-slick";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import ReactModal from 'react-modal';
import ReactTooltip from 'react-tooltip'
// Components
import Button from '../Commons/Button';
import withPlayerFunctional from 'universal/HOC/withPlayerFunctional';
import AlbumsSection from 'universal/components/Sections/AlbumsSection';
import TourSection from 'universal/components/Sections/TourSection';
import MusicSection from 'universal/components/Sections/MusicSection';
import ArtistAudio from './ArtistAudio';
import ArtistInfo from './ArtistInfo';
// Actions
import { getArtistData, getArtistAudioPart } from './ArtistProfileActions';

const mapStateToProps = state => ({
  artist: state.ArtistProfileReducer.artist,
  artistAudioListPart: state.ArtistProfileReducer.artistAudioListPart,
  currentMusic: state.controlMusicReducer.currentMusic,
  isPlaying: state.controlMusicReducer.isPlaying,
  isLoading: state.controlMusicReducer.isLoading,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getArtistAudioPart,
    getArtistData
  }, dispatch);
}

class ArtistProfileContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showCoverModal: false,
      horizontalCover: ''
    };
  }

  componentDidMount() {
    const {
      getArtistData,
      getArtistAudioPart,
      locationParams
    } = this.props;

    getArtistData(locationParams.alias);
    getArtistAudioPart(locationParams.alias);
  }

  handleCloseCoverModal = () => {
    this.setState({
      showCoverModal: false,
      horizontalCover: ''
    })
  }

  onAddHorizontalCover = event => {
    if(event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = event => {
        this.setState({ horizontalCover: event.target.result })
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  render() {
    const {
      artist,
      artistAudioListPart,
      locationParams,
      handleChoseAudio
    } = this.props;

    return (
      <div className="artist-profile">
        <div className="artist-cover">
          {artist.coverHorizontal ?
            <img src={`http://localhost:8080/api/cover/artist/${artist.coverHorizontal}/horizontal`} className="cover-horizontal"/> :
            <div className="default-cover"><span>{artist.name}</span></div>
          }
          <div className="edit-cover" onClick={() => this.setState({ showCoverModal: true })}><span>Змінити</span></div>
        </div>
        <main id="page" className="page clearfix">

          <div className="content">

            <div className="artist-title official">
              {locationParams.mode && <Link className="btn-back" to={`../${artist.alias}`}></Link>}

              <span>{artist.name}</span>
            </div>
            <div style={{"position": 'relative'}}>
              {!locationParams.mode && <a className="admin-add-link">Редагувати</a>}
              {!locationParams.mode ? (
                <Fragment>
                  <MusicSection
                    title={"ТОП-треки"}
                    data={artistAudioListPart}
                    fullListLink={`audio/${locationParams.alias}`}
                    currentId={this.props.currentMusic._id}
                    isPlaying={this.props.isPlaying}
                    isLoading={this.props.isLoading}
                    onChoseAudio={audioData => handleChoseAudio(audioData, artistAudioListPart)}
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
              )}
            </div>

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

            <div className="social-link sidebar-wrapper">
              <a
                href="https://www.instagram.com/the_hardkiss/"
                target="_blank"
                className="link instagram"
                data-tip
                data-for='tip-instagram'
              ></a>
              <ReactTooltip id='tip-instagram' effect='solid' className="tooktip">
                <span>@the_hardkiss</span>
              </ReactTooltip>

              <a
                href="https://www.youtube.com/user/THEHARDKISS"
                target="_blank"
                className="link youtube"
                data-tip
                data-for='tip-youtube'
              ></a>
              <ReactTooltip id='tip-youtube' effect='solid' className="tooktip">
                <span>Офіційний YouTube канал</span>
              </ReactTooltip>

              <a
                href="https://twitter.com/the_hardkiss"
                target="_blank"
                className="link twitter"
                data-tip
                data-for='tip-twitter'
              ></a>
              <ReactTooltip id='tip-twitter' effect='solid' className="tooktip">
                <span>@the_hardkiss</span>
              </ReactTooltip>

              <a
                href="https://t.me/the_hardkiss"
                target="_blank"
                className="link telegram"
                data-tip
                data-for='tip-telegram'
              ></a>
              <ReactTooltip id='tip-telegram' effect='solid' className="tooktip">
                <span>@the_hardkiss</span>
              </ReactTooltip>

              <a
                href="https://www.facebook.com/THEHARDKISS"
                target="_blank"
                className="link facebook"
                data-tip
                data-for='tip-facebook'
              ></a>
              <ReactTooltip id='tip-facebook' effect='solid' className="tooktip">
                <span>THEHARDKISS</span>
              </ReactTooltip>

              <a
                href="https://soundcloud.com/the_hardkiss"
                target="_blank"
                className="link soundcloud"
                data-tip
                data-for='tip-soundcloud'
              ></a>
              <ReactTooltip id='tip-soundcloud' effect='solid' className="tooktip">
                <span>the_hardkiss</span>
              </ReactTooltip>

              <a
                href="https://thehardkiss.com/"
                target="_blank"
                className="link"
                data-tip
                data-for='tip-site'
              ></a>
              <ReactTooltip id='tip-site' effect='solid' className="tooktip">
                <span>Офіційний сайт</span>
              </ReactTooltip>

              <a
                href="javascript: void(0);"
                target="_blank"
                className="link share"
                data-tip
                data-for='tip-share'
              ></a>
              <ReactTooltip id='tip-share' effect='solid' className="tooktip">
                <span>Функція ще в розробці</span>
              </ReactTooltip>

            </div>

            <div className="sidebar-link sidebar-wrapper">
              <Link to={`info/${artist.alias}`} className="link info">Інформація про виконавця</Link>
            </div>

            <div className="sidebar-wrapper">
              <Button className="btn full">Підписатися</Button>
            </div>

            <div className="sidebar-link sidebar-wrapper">
              <Link to={`../profile/${this.props.currentUserId}`} className="link my">Мої треки</Link>
              <Link to="../upload/" className="link upload">Завантажити аудіозаписи</Link>
              <Link to="/recommend" className="link recommend">Рекомендації</Link>
              <Link to={`../followers/${this.props.currentUserId}`} className="link follow">Слухаю їх</Link>
              <Link to="/update" className="link update">Оновлення</Link>
              <Link to={`../stats/${this.props.currentUserId}`} className="link stats">Статистика</Link>
              <Link to="/settings" className="link settings">Налаштування</Link>
            </div>
          </div>

          <ReactModal
            isOpen={this.state.showCoverModal}
            className="modal edit-cover-modal"
            overlayClassName="overlay"
          >
            <div className="title">
              Зміна обкладинки
              <div className="close" onClick={this.handleCloseCoverModal}></div>
            </div>

            <div className="input-wrapper">
              <div className="cover horizontal">
                {
                  this.state.horizontalCover ?
                  <img src={this.state.horizontalCover} /> :
                  <div className="default-cover"><span>{artist.name}</span></div>
                }
                <div
                  className="edit-cover"
                  onClick={() => document.getElementById('horizontalCoverFile').click()}
                >
                  <span>Змінити</span>
                </div>
                <input
                  type="file"
                  name="horizontalCoverFile"
                  id="horizontalCoverFile"
                  style={{display: 'none'}}
                  onChange={e => this.onAddHorizontalCover(e)}
                />
              </div>
              <p className="sub-text">
                Відображається лише в шапці на сторінці виконавця. Допустимий розмір 1240х260
              </p>
            </div>

            <div className="devider"></div>

            <div className="input-wrapper">
              <Button className="red">Змінити</Button>
            </div>
          </ReactModal>

          <NotificationContainer />
        </main>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withPlayerFunctional(ArtistProfileContainer));

const ArtistMode = props => {
  switch(props.mode) {
    case 'audio':
      return <ArtistAudio artistAlias={props.artistAlias} />;

    case 'album':
      return "album";

    case 'tour':
      return "tour";

    case 'info':
      return <ArtistInfo artistAlias={props.artistAlias} />;

    default:
      return <Redirect to="/404" />;
  }
}