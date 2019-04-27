// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import isEqual from 'lodash.isequal';
import ReactPlaceholder from 'react-placeholder';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders';
// Components
import Button from '../Commons/Button';
// Actions
import { getVisibleUserData, getArtistsByUser } from './visibleUserDataActions';
import { followUser } from 'universal/components/Followers/followListActions';

const mapStateToProps = (state, props) => ({
  currentUserName: state.AuthReducer.user.name,
  currentUserId: state.AuthReducer.user.id,
  followersCount: state.visibleUserDataReducer.followersCount,
  audioCount: state.visibleUserDataReducer.audioCount,
  canFollowUser: state.visibleUserDataReducer.canFollowUser,
  artistList: state.visibleUserDataReducer.artistList
});

const mapDispatchToProps = (dispatch, props) => bindActionCreators({
  getVisibleUserData,
  getArtistsByUser,
  followUser,
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class SidebarContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.mounted = true;

    this.state = {
      dataReady: false
    }
  }

  componentDidMount() {
    this.props.getVisibleUserData(
        this.props.currentUserId,
        this.props.locationParams.login !== undefined ? this.props.locationParams.login : this.props.currentUserId
    )
    .then(response => {
      if(this.mounted) this.setState({ dataReady: true });
    });
    this.props.getArtistsByUser(this.props.currentUserId);
  }



  componentWillUnmount() {
    this.mounted = false;
  }

  handleFollow = () => {
    this.props.followUser(this.props.currentUserId, this.props.locationParams.login);
  };

  handleUnfollow = () => {

  };

  render() {
    return (
      <div className="sidebar">
        <div className="counts sidebar-wrapper">
          <div className="col">
            <span className="text">Підписались</span>
            <span className="count">
              <ReactPlaceholder showLoadingAnimation ready={this.state.dataReady} customPlaceholder={countPlaceholder}>
                {this.props.followersCount}
              </ReactPlaceholder>
            </span>
          </div>
          <div className="col">
            <span className="text">Аудіофайлів</span>
            <span className="count">
              <ReactPlaceholder showLoadingAnimation ready={this.state.dataReady} customPlaceholder={countPlaceholder}>
                {this.props.audioCount}
              </ReactPlaceholder>
            </span>
          </div>
        </div>

        <div className="sidebar-wrapper">
          {
            this.props.locationParams.login && this.props.currentUserId !== this.props.locationParams.login &&
            (<div className="sidebar-wrapper">
              {
                this.props.canFollowUser ?
                <Button className="btn full blue" onClick={this.handleFollow}>Підписатися</Button> :
                <Button className="btn full red" onClick={this.handleUnfollow}>Відписатись</Button>
              }
            </div>)
          }

          <div className="sidebar-link">
            <Link to={`../profile/${this.props.currentUserId}`} className="link my">Мої треки</Link>
            <Link to="../upload/" className="link upload">Завантажити аудіозаписи</Link>
            <Link to="/recommend" className="link recommend">Рекомендації</Link>
            <Link to={`../followers/${this.props.currentUserId}`} className="link follow">Слухаю їх</Link>
            <Link to="/update" className="link update">Оновлення</Link>
            <Link to={`../stats/${this.props.currentUserId}`} className="link stats">Статистика</Link>
            <Link to="/settings" className="link settings">Налаштування</Link>

            {this.props.artistList.length > 0 && <div className="divider"></div>}
            {this.props.artistList.map(artist => {
              return (
                <Link
                  key={artist._id}
                  to={`/artist/${artist._id}`}
                  className="link"
                >
                  {artist.name}
                </Link>
              )
              })}
          </div>
        </div>
      </div>
    );
  }
}

const countPlaceholderStyle = {
  width: '14px',
  height: '20px',
  borderRadius: '3px',
  position: 'absolute',
  top: '0',
  left: '50%',
  transform: 'translateX(-50%)'
}

const countPlaceholder = (
  <div style={{position: 'relative'}}>
    <RectShape color="#ccc" style={countPlaceholderStyle} />
  </div>
);

