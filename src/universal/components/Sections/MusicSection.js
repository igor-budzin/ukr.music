// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
// Components
import MusicItem from 'universal/components/AudioList/MusicItem';

const MusicSection = props => {
  return (
    <div
      className={classNames('section top-audio', {
        empty: !props.data.length
      })}
    >
      <div className="title">
        <span>{props.title ? props.title : 'ТОП-треки'}</span>
        <Link className="link" to={`${props.fullListLink}`}>Всі треки</Link>
      </div>

      <div className="body">
        {props.data.length ? props.data.map((item, index) => {
            return (
              <MusicItem
                key={item._id + index}
                mini={true}
                currentId={props.currentId}
                isPlaying={props.isPlaying}
                isLoading={props.isLoading}
                audio={item}
                onChoseAudio={props.onChoseAudio}
                handleGetPlaylists={props.handleGetPlaylists}
              />
            )
          }) : <div className="empty-list">Тут поки немає треків</div>}
      </div>
    </div>
  );
}

export default MusicSection;

MusicSection.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  currentId: PropTypes.string.isRequired,
  onChoseAudio: PropTypes.func.isRequired
};