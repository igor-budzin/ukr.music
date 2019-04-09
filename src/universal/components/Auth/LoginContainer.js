// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Typed from 'typed.js';
// Components
import Button from '../Commons/Button';
// Actions
import * as AuthAction from './AuthActions';

const mapStateToProps = state => ({
  currentUserId: state.AuthReducer.user.id,
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

  componentDidMount() {
    const options = {
      strings: [
        'The Hardkiss',
        'Detach',
        'Within Temptation',
        'Друга Ріка',
        'Metallica',
        'Animal ДжаZ',
        'Skillet',
        'Three Days Grace',
        'Bring Me The Horizon'
      ],
      loop: true,
      loopCount: Infinity,
      typeSpeed: 60,
      backSpeed: 60,
      backDelay: 2000
    }

    this.typed = new Typed(".artist", options);
  }

  componentWillUnmount() {
    this.typed.destroy();
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
    if(this.state.redirect) return <Redirect to={`/profile/${this.props.currentUserId}`} />

    return (
      <div className="auth-wrapper clearfix">
        <div className="text-wrapper">
          <p className="text">Сервіс потокової<br /> музики</p>
          <p className="artist"></p>
        </div>
        <div className="form-wrapper">
            <div className="input-wrapper">
              <Button
                typeButton="submit"
                className="btn google"
                isLoading={this.props.isLoginLoading}
                onClick={this.handleSubmitLog}
              >
                Google
              </Button>
            </div>

            <div className="input-wrapper">
              <Button
                typeButton="submit"
                className="btn facebook"
                isLoading={this.props.isLoginLoading}
                onClick={this.handleSubmitLog}
              >
                Facebook
              </Button>
            </div>

            <div className="input-wrapper">
              <Button
                typeButton="submit"
                className="btn telegram"
                isLoading={this.props.isLoginLoading}
                onClick={this.handleSubmitLog}
              >
                Telegram
              </Button>
            </div>
        </div>
      </div>
    );
  }
}