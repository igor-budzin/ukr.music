import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import 'universal/assets/styles/commons/CheckboxCircle.scss';

export default class CheckboxCircle extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      check: false
    }
  }

  onClick = () => {
    this.setState({ check: !this.state.check })
  }

  render() {
    const { theme, className } = this.props;

    return (
      <div
        className={cn(
          className,
          'checkbox-circle',
          theme ? theme : 'blue',
          { check: this.state.check }
        )}
        onClick={this.onClick}
      >
        <span></span>
      </div>
    );
  }
}

CheckboxCircle.propTypes = {
  theme: PropTypes.oneOf(['blue', 'orange'])
};