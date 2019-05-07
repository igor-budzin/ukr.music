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

  handlePoll = id => {
    this.setState({ answered: true })
    console.log(id)
  }

  render() {
    const { title, fullListLink } = this.props;

    return (
      <div className={classNames({
          section: true,
          poll: true,
          answered: this.state.answered
        })}
      >
        <div className="title">
          <span>{title ? title : 'Кращий трек 2018 року'}</span>
          <Link className="link" to={`${fullListLink}`}>Всі</Link>
        </div>

        <div className="body">
          {
            pollsAnswers.map(answer => {
              return(
                <div
                  className="answer"
                  key={answer.index}
                  onClick={() => !this.state.answered ? this.handlePoll(answer.index) : null}
                >
                  <CheckboxCircle className="checkbox" />
                  <span className="label">{answer.name}</span>
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
  // title: PropTypes.string,
  // data: PropTypes.array.isRequired,
  // isPlaying: PropTypes.bool.isRequired,
  // isLoading: PropTypes.bool.isRequired,
  // currentId: PropTypes.string.isRequired,
  // onChoseAudio: PropTypes.func.isRequired
};

const pollsAnswers = [
  { name: 'Detach - Bridges', persent: '50', index: '1' },
  { name: 'Epolets - Казка', persent: '20', index: '2' },
  { name: 'The Hardkiss - Forever More', persent: '15', index: '3' },
  { name: 'Within Temptation - In the Middle of the Night', persent: '25', index: '4' },
  { name: 'O.Torvald - Два нуль один вісім', persent: '7', index: '5' }
]