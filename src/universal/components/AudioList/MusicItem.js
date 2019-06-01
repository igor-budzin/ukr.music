import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import classNames from 'classnames';
import { formatSeconds } from 'universal/utils';
import { API_URL } from '../../../global.config';
import PropTypes from 'prop-types';

import InfinityLoaderSVG from 'universal/components/Commons/InfinityLoaderSVG';

export default class MusicItem extends Component {
  onClick = () => {
    
  }

  onAddToPlaylist = event => {
    event.stopPropagation();
    const { handleGetPlaylists, audio } = this.props;

    if(typeof handleGetPlaylists === 'function') {
      handleGetPlaylists(audio._id);
    }
  }

  onAddToUser = event => {
    event.stopPropagation();
    const { handleAddToUser, audio } = this.props;

    if(typeof handleAddToUser === 'function') {
      handleAddToUser(audio._id);
    }
  }

  render() {
    const {
      onChoseAudio,
      isPlaying,
      isLoading,
      currentId,
      style,
      mini,
      audio
    } = this.props;

    let coverStyle = {};
    if(audio.picture) {
     coverStyle = { "backgroundImage": `url("${API_URL}/cover/audio/${audio.picture}")` };
    }

    const loaderStyle = {
      "width": mini ? "66px" : "78px",
      "marginLeft": mini ? "-15px" : "-17px",
      "marginTop": mini ? "2px" : "3px"
    }

    return (
      <div
        className={classNames(
          'audio-row',
          currentId === audio._id ? 'isCurrent' : null,
          isPlaying && currentId === audio._id ? 'isPlaying' : null,
          mini ? 'mini': null,
          isLoading && currentId === audio._id ? 'isLoading' : null
        )}
        onClick={() => onChoseAudio(audio)}
        style={style ? style : {}}
      >
        <div
          className={classNames(
            'audio-row-cover',
            audio.picture && coverStyle.backgroundImage !== undefined ? null : 'empty')
          }
          style={coverStyle.backgroundImage !== undefined ? coverStyle : null}>
            <div className="loader">{<InfinityLoaderSVG style={loaderStyle} />}</div>
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
          <div className="singer"><a href="javascript:void(0);">{audio.artists}</a></div>
          <div className="song"><a href="javascript:void(0);">{audio.title}</a></div>
        </div>
        
        <div className="audio-row-time">{formatSeconds(audio.duration)}</div>

        <div className="audio-row-options">
          {typeof this.props.handleGetPlaylists === 'function' && (
            <div className="item add-to-playlist" title="Додати в плейлист" onClick={this.onAddToPlaylist}></div>
          )}
          
          {typeof this.props.handleAddToUser === 'function' && (
            <div className="item add" title="Додати собі" onClick={this.onAddToUser}></div>
          )}
        </div>
      </div>
    );
  }
}

MusicItem.propTypes = {
  mini: PropTypes.bool,
  audio: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  currentId: PropTypes.string.isRequired,
  style: PropTypes.object,
  handleAddToUser: PropTypes.func,
  onChoseAudio: PropTypes.func.isRequired
};