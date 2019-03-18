import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';
// Actions
import * as AuthAction from './Auth/AuthActions';

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			redirect: false
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
							<li><NavLink to="/" activeClassName="active" exact>Головна</NavLink></li>
							<li><NavLink to={`/profile/${this.props.currentUserName}`} activeClassName="active">Музика</NavLink></li>
							<li><a href="#">Афіша</a></li>
							<li><a href="#">Контакти</a></li>
						</ul>
					</div>
					<div className="item-right">
						<div className="header-user-auth">
							<a href="javascript:void(0)" onClick={this.handleLogout}>Вихід</a>
						</div> 
					</div>
					<div className="item-right">
						<div className="header-lang">
							<a href="#">EN</a>
						</div>
					</div>
				</div>
			</header>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		currentUserName: state.AuthReducer.user.name
	};
}

function mapDispatchToProps(dispatch, props) {
	return bindActionCreators(AuthAction, dispatch);
}