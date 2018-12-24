import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
						<a href="#" className="header-logo">ukr.music</a>
					</div>
					<div className="item-left">
						<ul className="header-nav">
							<li><Link to="/">Головна</Link></li>
							<li><Link to="/music" className="active">Музика</Link></li>
							<li><a href="#">Відео</a></li>
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
		// playlist: state.getMusicReducer.music,
		// currentMusic: state.controlMusicReducer.currentMusic,
		// isPlaying: state.controlMusicReducer.isPlaying,
		// userId: state.AuthReducer.user.id
	};
}

function mapDispatchToProps(dispatch, props) {
	return bindActionCreators(AuthAction, dispatch);
}