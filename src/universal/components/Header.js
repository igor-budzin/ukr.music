import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';
import cx from 'classnames';
// Actions
import * as AuthAction from './Auth/AuthActions';

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      redirect: false,
      openLangMenu: false
    }
  }

  handleLogout = () => {
    this.props.logoutUser();
    this.setState({
      redirect: true
    });
  }

  render() {
    if(this.state.redirect) return <Redirect to='/login' />

    return (
      <header id="header" className="header">
        <div className="container">
          <div className="item-left">
            <a href="#" className="header-logo">Cabin of pilot</a>
          </div>
          <div className="item-left">
            <ul className="header-nav">
              <li><Link to="/">Головна</Link></li>
              <li><Link to={`/profile/${this.props.currentUserId}`}>Музика</Link></li>
              <li><a href="#">Афіша</a></li>
              <li><a href="#">Блог</a></li>
              <li><Link to="/contact">Контакти</Link></li>
            </ul>
          </div>
          <div className="item-right">
            <div className="header-user-auth">
              <a href="javascript:void(0)" onClick={this.handleLogout}>Вихід</a>
            </div> 
          </div>
          <div className="item-right">
            <div className={cx('header-lang', { active: this.state.openLangMenu })}>
              <a
                href="javascript:void(0);"
                onClick={() => this.setState({ openLangMenu: !this.state.openLangMenu })}
              >EN</a>

              <div className="list-item">
                <div className="item">English</div>
                <div className="item">Українська</div>
                <div className="item">Deutsch</div>
                <div className="item">Polski</div>
                <div className="item">Français</div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    currentUserId: state.AuthReducer.user.id
  };
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators(AuthAction, dispatch);
}