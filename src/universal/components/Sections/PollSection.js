// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
// Components
import CheckboxCircle from 'universal/components/Commons/CheckboxCircle';

class PollSection extends Component {
  render() {
    const { fullListLink, poll, user } = this.props;

    return (
      <div className={classNames({
          section: true,
          poll: true,
          answered: poll.answered
        })}
      >
        <div className="title">
          <span>{poll && poll.title}</span>
          <Link className="link" to={`${fullListLink}`}>Всі</Link>
        </div>

        <div className="body">
          {poll.alias &&
            poll.answer.map(answer => {
              return(
                <div
                  className="answer"
                  key={answer.id}
                  onClick={() => this.props.handlePollVote(poll.alias, answer.id, user.id)}
                >
                  <CheckboxCircle className="checkbox" />
                  <span className="label">{answer.title}</span>
                  <div className="percent">{answer.persent}%</div>
                  <div className="progress"><span></span></div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default PollSection;

PollSection.propTypes = {
  poll: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  voting: PropTypes.bool.isRequired,
};
