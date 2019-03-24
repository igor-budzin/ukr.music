// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
// Components
import Button from '../Commons/Button';
// Actions
import * as AuthAction from './AuthActions';

const mapStateToProps = state => ({
  userId: state.AuthReducer.user.id,
  currentUserLogin: state.AuthReducer.user.login,
  isLoginLoading: state.AuthReducer.isLoginLoading,
  errors: state.AuthReducer.errors
});

const mapDispatchToProps = dispatch => bindActionCreators(AuthAction, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class LoginContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      redirect: false
    }
  }

  handleSubmitLog = event => {
    event.preventDefault();

    this.props.loginUser()
    .then(res => {
      this.setState({ redirect: true });
    })
    .catch(err => console.log(err))
  };

  render() {
    if(this.state.redirect) return <Redirect to={`/profile/${this.props.currentUserLogin}`} />

    return (
      <div className="auth-wrapper">
        <div className="form-wrapper">
          <h2>Авторизація через:</h2>


            <div className="input-wrapper">
              <Button
                typeButton="submit"
                className="btn"
                isLoading={this.props.isLoginLoading}
                onClick={this.handleSubmitLog}
              >
                Google
              </Button>
            </div>

        </div>
      </div>
    );
  }
}