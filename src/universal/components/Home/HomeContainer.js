// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import withPlayerFunctional from 'universal/HOC/withPlayerFunctional';
import MusicSection from 'universal/components/Sections/MusicSection';
import AlbumsSection from 'universal/components/Sections/AlbumsSection';
import CollectionSection from 'universal/components/Sections/CollectionSection';
import MusicPlayerContainer from 'universal/components/Player/MusicPlayerContainer';
// Actions
import { getMusicList } from 'universal/redux/actions/musicDataActions';

const mapStateToProps = state => ({
  audioList: state.getMusicReducer.music,
  hasNextPage: state.getMusicReducer.hasNextPage,
  currentMusic: state.controlMusicReducer.currentMusic,
  isPlaying: state.controlMusicReducer.isPlaying,
  isLoading: state.controlMusicReducer.isLoading,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getMusicList }, dispatch);
};

class HomeContainer extends Component {
  componentDidMount() {
    this.props.getMusicList({ limit: 8, sortBy: 'listenCount' });
  }

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
              data={this.props.audioList}
              onChoseAudio={audioData => this.props.handleChoseAudio(audioData, this.props.audioList)}
              handleGetPlaylists={this.props.handleGetPlaylists}
              isPlaying={this.props.isPlaying}
              isLoading={this.props.isLoading}
              currentId={this.props.currentMusic._id}
              fullListLink={`musiclist/popular`}
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

export default connect(mapStateToProps, mapDispatchToProps)(withPlayerFunctional(HomeContainer));