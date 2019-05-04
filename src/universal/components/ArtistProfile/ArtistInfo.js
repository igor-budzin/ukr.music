import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ReactPlaceholder from 'react-placeholder';
import ReactModal from 'react-modal';
// import Gallery from 'react-photo-gallery';
// import Lightbox from 'react-images';
// Components
import InfinityLoaderSVG from 'universal/components/Commons/InfinityLoaderSVG';
// Actions


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    
  }, dispatch);
}

class ArtistInfo extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      infoReady: true,
      currentImage: 0
    }
  }

  openLightbox = (event, obj) => {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  render() {
    return(
      <div style={{"position": 'relative'}}>
        <a className="admin-add-link" onClick={() => this.setState({ showModal: true })}>Змінити інформацію</a>
        <ReactPlaceholder
          showLoadingAnimation
          ready={this.state.infoReady}
          customPlaceholder={<InfinityLoaderSVG style={{'marginTop': '40px', 'width': '240px'}} />}
        >
          {true ?
            <div className="info">
              <div className="list">
                <div className="list-item">
                  <span className="key">Країна:</span>
                  <span className="value">Україна, Київ</span>
                </div>

                <div className="list-item">
                  <span className="key">Жанр:</span>
                  <span className="value">прогресивний поп, електро, поп-рок, хард-рок</span>
                </div>

                <div className="list-item">
                  <span className="key">Учасники:</span>
                  <div className="wrap">
                    <span className="value">Юлія Саніна (вокал)</span>
                    <span className="value">Валерій «Val» Бебко (гітара)</span>
                    <span className="value">DJ Kreechy (ударні)</span>
                    <span className="value">Роман Скоробагатько (гітара)</span>
                    <span className="value">Поль Солонар (Клавіші)</span>
                    <span className="value">Клим Лисюк</span>
                  </div>
                </div>
              </div>

              <div className="short-description">
                <p>The Hardkiss — український музичний гурт, створений у 2011 році.
                Усі пісні гурту написані солісткою Юлією Саніною та Валерієм Бебком,
                який також є креативним продюсером «The Hardkiss». Пе́рчиком гурту є яскраві образи та перуки
                солістки, над якими працюють стилісти Слава Чайка та Віталій Дацюк.</p>
              </div>


              <div>

              </div>

            </div>
            : <div></div>}
        </ReactPlaceholder>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistInfo);

// ArtistAudio.propTypes = {
//   artistAlias: PropTypes.string.isRequired
// };
// 
const images = [
  { src: 'http://localhost:8080/api/cover/audio/Renegade_Five_-_Save_My_Soul.jpg'},
  { src: 'http://localhost:8080/api/cover/audio/Renegade_Five_-_Save_My_Soul.jpg'},
  { src: 'http://localhost:8080/api/cover/audio/Renegade_Five_-_Save_My_Soul.jpg'}
];