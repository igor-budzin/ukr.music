// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationContainer, NotificationManager } from "react-light-notifications";
import SlickSlider from "react-slick";
// Components
import Button from '../Commons/Button';
import AlbumsSection from './AlbumsSection';
import TourSection from './TourSection';
import TopMusicSection from './TopMusicSection';
// Actions
// import * as AuthAction from './AuthActions';

@connect(mapStateToProps, mapDispatchToProps)
export default class ArtistProfileContainer extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {

		};
	}

	render() {
		return (
			<div className="artist-profile">
				<div className="artist-cover"></div>
				<main id="page" className="page clearfix">

					<div className="content">

						<div className="artist-title">The Hardkiss</div>

						<TopMusicSection />
						<AlbumsSection />
						<TourSection />

						{/*<PlayList />*/}
					</div>

					<div className="sidebar">
						<div className="counts sidebar-wrapper">
							<div className="col">
								<span className="text">Підписалось</span>
								<span className="count">20 400</span>
							</div>
							<div className="col">
								<span className="text">Аудіофайлів</span>
								<span className="count">120</span>
							</div>
						</div>

						<div className="sidebar-wrapper">
							<Button className="btn full">Підписатися</Button>
						</div>
					</div>

					<NotificationContainer />
				</main>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		// isRegisterLoading: state.AuthReducer.isRegisterLoading,
		// errors: state.AuthReducer.errors
	};
}

function mapDispatchToProps(dispatch, props) {
	return bindActionCreators({}, dispatch);
}