import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import classNames from 'classnames';
import { formatSeconds } from 'universal/utils';
import { API_URL } from '../../../global.config';
import PropTypes from 'prop-types';

import InfinityLoaderSVG from 'universal/components/Commons/InfinityLoaderSVG';

export default class MusicItem extends Component {
  onClick = () => {
    if(typeof this.props.handleChoseAudio === 'function') {
      this.props.handleChoseAudio({
        _id: this.props._id,
        link: this.props.link,
        title: this.props.title,
        artists: this.props.artist,
        duration: this.props.duration,
        picture: this.props.picture
      });
    }
  }

  onAddToPlaylist = event => {
    event.stopPropagation();
    const { handleGetPlaylists } = this.props;

    if(typeof handleGetPlaylists === 'function') {
      handleGetPlaylists(this.props._id);
    }
  }

  onAdd = event => {
    event.stopPropagation();
    const { handleAddToUser } = this.props;

    if(typeof handleAddToUser === 'function') {
      handleAddToUser(this.props._id);
    }
  }

  render() {
    const {
      _id,
      isPlaying,
      isLoading,
      currentId,
      style,
      picture,
      title,
      mini,
      artist,
      duration
    } = this.props;

    let coverStyle = {};
    if(picture) {
     coverStyle = { "backgroundImage": `url("${API_URL}/cover/audio/${picture}")` };
    }

    return (
      <div
        className={classNames(
          'audio-row',
          currentId === _id ? 'isCurrent' : null,
          isPlaying && currentId === _id ? 'isPlaying' : null,
          mini ? 'mini': null,
          isLoading && currentId === _id ? 'isLoading' : null
        )}
        onClick={this.onClick}
        style={style ? style : {}}
      >
        <div
          className={classNames(
            'audio-row-cover',
            picture && coverStyle.backgroundImage !== undefined ? null : 'empty')
          }
          style={coverStyle.backgroundImage !== undefined ? coverStyle : null}>
            <div className="loader">{<InfinityLoaderSVG style={{'width': '78px', 'marginLeft': '-17px', 'marginTop': '3px'}} />}</div>
            <div className="bars">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          <div className="bg"></div>
        </div>
        <div className="audio-row-desc">
          <div className="singer"><a href="javascript:void(0);">{artist}</a></div>
          <div className="song"><a href="javascript:void(0);">{title}</a></div>
        </div>
        {
          !this.props.withoutTime && (
            <div className="audio-row-time">{formatSeconds(duration)}</div>
          )
        }
        <div className="audio-row-options">
          {typeof this.props.handleGetPlaylists === 'function' && (
            <div className="item add-to-playlist" title="Додати в плейлист" onClick={this.onAddToPlaylist}></div>
          )}
          
          {typeof this.props.handleAddToUser === 'function' && (
            <div className="item add" title="Додати собі" onClick={this.onAdd}></div>
          )}
        </div>
      </div>
    );
  }
}

MusicItem.propTypes = {
  mini: PropTypes.bool,
  withoutTime: PropTypes.bool,
  _id: PropTypes.string,
  isPlaying: PropTypes.bool,
  isLoading: PropTypes.bool,
  currentId: PropTypes.string,
  style: PropTypes.object,
  picture: PropTypes.string,
  title: PropTypes.string,
  artist: PropTypes.string,
  handleAddToUser: PropTypes.func,
  handleChoseAudio: PropTypes.func
};

const svgLoaderStyle = {
  left: '50%',
  top: '50%',
  marginTop: '23px',
  width: '80px',
  position: 'absolute',
  transform: 'translate(-50%, -50%) matrix(1, 0, 0, 1, 0, 0)',
};

const musicLoader = (
  <div style={{position: 'relative'}}>
    <svg viewBox="0 0 187.3 93.7" preserveAspectRatio="xMidYMid meet" style={svgLoaderStyle}>
      <path stroke="#ff4838" id="outline" fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" 
            d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1        c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z" />
      <path id="outline-bg" opacity="0.5" fill="none" stroke="#ededed" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" 
            d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1        c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z" />
    </svg>
  </div>
);