// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import MusicSection from 'universal/components/Sections/MusicSection';
import AlbumsSection from 'universal/components/Sections/AlbumsSection';
import CollectionSection from 'universal/components/Sections/CollectionSection';
import MusicPlayerContainer from 'universal/components/Player/MusicPlayerContainer';
// Actions
import { getMusicList } from 'universal/redux/actions/musicDataActions';
import * as AudioActions from 'universal/redux/actions/controlMusicActions';

const mapStateToProps = state => ({
  playlist: state.getMusicReducer.music,
  hasNextPage: state.getMusicReducer.hasNextPage,
  currentMusic: state.controlMusicReducer.currentMusic,
  isPlaying: state.controlMusicReducer.isPlaying,
  isLoading: state.controlMusicReducer.isLoading,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...AudioActions, getMusicList }, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
export default class HomeContainer extends Component {
  componentDidMount() {
    this.props.getMusicList({ limit: 8, sortBy: 'listenCount' });
  }

  handleChoseAudio = audioData => {
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

  render() {
    return (
      <main id="page" className="page home clearfix">
        <h2 className="section-title">Головна</h2>

        <div className="container clearfix">
          <MusicPlayerContainer />
        </div>

        <div className="filter-hr"></div>

        <div className="clearfix">
          <div className="content">
            <MusicSection
              title="Набувають популярності"
              data={this.props.playlist}
              handleChoseAudio={this.handleChoseAudio}
              isPlaying={this.props.isPlaying}
              isLoading={this.props.isLoading}
              currentId={this.props.currentMusic._id}
            />
            
          </div>
        </div>

        <div>
          <AlbumsSection />
        </div>

        <div>
          <div style={{"width": "49%", "float": "left"}}>
            <CollectionSection
              cover="collection1.jpg"
              label2="Within Temptation"
            />
          </div>
          <div style={{"width": "49%", "float": "right"}}>
            <CollectionSection
              cover="collection2.jpg"
              label2="The Hardkiss"
            />
          </div>
        </div>

      </main>
    );
  }
}


const data =[{"_id":"5c879cdd0b050b1810a2b686","link":"1552391387977_Кораблі_-_The_Hardkiss.mp3","title":"Кораблі","artists":"The Hardkiss","duration":203.938,"picture":"Кораблі_-_The_Hardkiss.jpg"},{"_id":"5c8798965cf9c11f68e05886","link":"1552390292464_Free_Me_-_The_Hardkiss.mp3","title":"Free Me","artists":"The Hardkiss","duration":192.313,"picture":"Free_Me_-_The_Hardkiss.jpg"},{"_id":"5c87965e5cf9c11f68e05885","link":"1552389725705_Привіт_-_The_Hardkiss.mp3","title":"Привіт","artists":"The Hardkiss","duration":49.92,"picture":"Привіт_-_The_Hardkiss.jpg"},{"_id":"5c8793025cf9c11f68e05884","link":"1552388864333_Журавлі_-_The_Hardkiss_.mp3","title":"Журавлі","artists":"The Hardkiss","duration":169.117,"picture":"Журавлі_-_The_Hardkiss_.jpg"}];