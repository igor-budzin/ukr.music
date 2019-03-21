// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { API_URL } from '../../../global.config';
// Components
import MusicItem from 'universal/components/Playlist/MusicItem';

const CollectionSection = props => {
  const { label, label2 } = props;
  return (
    <div className="section collection">
      <div className="layer">
        <div className="play-btn"></div>
      </div>
      <div className="cover">
        <img src={`${API_URL}/image/${props.cover}`} />
      </div>
      <div className="description">
        <span className="label">{label ? label : 'Краще від'}</span><br />
        <span className="label2">{label2}</span>
      </div>
    </div>
  );
}

export default CollectionSection;

CollectionSection.propTypes = {
  label: PropTypes.string,
  label2: PropTypes.string.isRequired
};