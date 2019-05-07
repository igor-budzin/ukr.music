import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import 'universal/assets/styles/commons/CheckboxCircle.scss';

export default class CheckboxCircle extends Component {
  render() {
    const { theme, check, className, handleClick } = this.props;

    return (
      <div
        className={cn(
          className,
          'checkbox-circle',
          theme ? theme : 'blue',
          { check: check }
        )}
        onClick={() =>  typeof handleClick === 'function' ? handleClick() : null}
      >
        <span></span>
      </div>
    );
  }
}

CheckboxCircle.propTypes = {
  theme: PropTypes.oneOf(['blue', 'orange']),
  check: PropTypes.bool,
  handleClick: PropTypes.func
};