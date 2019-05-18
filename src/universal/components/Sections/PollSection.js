// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
// Components
import CheckboxCircle from 'universal/components/Commons/CheckboxCircle';

class PollSection extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoading: false,
      answered: false
    }
  }

  handlePoll = vote => {
    this.setState({ answered: true })
    console.log(id);
  }

  render() {
    const { fullListLink, data } = this.props;

    return (
      <div className={classNames({
          section: true,
          poll: true,
          answered: this.state.answered
        })}
      >
        <div className="title">
          <span>{data && data.title}</span>
          <Link className="link" to={`${fullListLink}`}>Всі</Link>
        </div>

        <div className="body">
          {data &&
            data.answer.map(answer => {
              return(
                <div
                  className="answer"
                  key={answer.id}
                  onClick={() => this.handlePoll}
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
  data: PropTypes.object.isRequired,
};
