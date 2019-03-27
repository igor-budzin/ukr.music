// Libraries
import React, { Component, Fragment } from 'react';

import LoginContainer from 'universal/components/Auth/LoginContainer';

export default class LoginPage extends Component {
  render() {
    return (
      <div className="login-page">
        <div>
          <LoginContainer />
        </div>
      </div>
    );
  }
}
