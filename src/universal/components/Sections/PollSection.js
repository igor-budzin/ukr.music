// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactPlaceholder from 'react-placeholder';
import classNames from 'classnames';
// Components
import CheckboxCircle from 'universal/components/Commons/CheckboxCircle';
import InfinityLoaderSVG from 'universal/components/Commons/InfinityLoaderSVG';

class PollSection extends Component {
  render() {
    const { fullListLink, poll, handlePollVote, user } = this.props;

    return (
      <div className="section poll">
        <div className="title">
          <span>{poll.title ? poll.title : 'Голосування'}</span>
          <Link className="link" to={`${fullListLink}`}>Всі</Link>
        </div>

        <div className="body">
          <ReactPlaceholder
            showLoadingAnimation
            ready={this.props.pollReady}
            customPlaceholder={<InfinityLoaderSVG style={{'marginTop': '40px', 'width': '240px'}} />}
          >
            {
              poll.alias ? 
              <Poll
                poll={poll}
                user={user}
                handlePollVote={handlePollVote}
              /> :
              <div className="empty-list">Немає активних голосувань</div>
            }
          </ReactPlaceholder>
        </div>
      </div>
    );
  }
}

export default PollSection;

PollSection.propTypes = {
  poll: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  voting: PropTypes.bool.isRequired
};

const Poll = props => {
  if(props.poll.voted) {
    return(
      props.poll.answer.map(answer => {
        const progress = answer.count / props.poll.totalAnswersCount * 100;
        return(
          <div
            className="answer"
            key={answer.id}
          >
            <span className="title">{answer.title}</span>
            <div className="percent">{progress.toFixed(1)}%</div>
            <div className="progress">
              <span style={{ "width": `${progress.toFixed(1)}%` }}></span>
            </div>
          </div>
        )
      })
    );
  }
  else {
    return(
      props.poll.answer.map(answer => {
        return(
          <div
            className="answer"
            key={answer.id}
            onClick={() => props.handlePollVote(props.poll.alias, answer.id, props.user.id)}
          >
            <CheckboxCircle className="checkbox" />
            <span className="label">{answer.title}</span>
          </div>
        )
      })
    );
  }
}