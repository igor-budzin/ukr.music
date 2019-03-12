// Libraries
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
// Components
import Button from '../Commons/Button';
import MusicItem from 'universal/components/Playlist/MusicItem';

const MusicSection = props => {
  return (
    <div className="section top-audio">
      <div className="title">
        <span>{props.title ? props.title : 'ТОП-треки'}</span>
        <a className="link" href="javascript:void(0)">Всі треки</a>
      </div>

      <div className="body">
        {
          props.data.map((item, index) => {
            return (
              <MusicItem
                key={index}
                mini={true}
                withoutTime={true}
                currentId={item.currentId}
                isPlaying={item.isPlaying}
                isLoading={item.isLoading}
                _id={item._id}
                link={item.link}
                artist={item.artists}
                title={item.title}
                picture={item.picture}
                duration={item.duration}
              />
            )
          })
        }
      </div>
    </div>
  );
}

export default MusicSection;

MusicSection.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array.isRequired
};