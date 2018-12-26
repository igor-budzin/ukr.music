// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationContainer, NotificationManager } from "react-light-notifications";
// Components
import Button from '../Commons/Button';
import PlayList from 'universal/components/PlayList/PlayList';
// Actions
// import * as AuthAction from './AuthActions';

@connect(mapStateToProps, mapDispatchToProps)
export default class RegisterContainer extends Component {
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
						<div className="section-links">
							<a href="#">Треки</a>
							<a href="#">Альбоми</a>
						</div>
						{/*<PlayList />*/}

						<div className="albumlist" style={{"marginTop": "40px"}}>
							<div className="album">
								<img src="https://localhost:8080/api/image/MAXIMALISM.jpg" alt="Epolets"/>
								<div className="description">
									<div className="name">Maximalism</div>
									<div className="count">12 треків • 39 хвилин</div>
									<div className="date">2016 рік</div>
									<div className="desc">
										«Maximalism» — четвертий студійний альбом шведського павер-металкор-гурту Amaranthe. Реліз відбувся 21 жовтня 2016. Останній альбом із вокалом Джейка І. Лундберга.
									</div>
								</div>
							</div>

							<div className="album">
								<img src="https://localhost:8080/api/image/thehardkiss-album.jpg" alt="Залізна ластівка"/>
								<div className="description">
									<div className="name">Залізна ластівка</div>
									<div className="count">17 треків • 53 хвилин</div>
									<div className="date">2018 рік</div>
									<div className="desc">
										Залізна ластівка — третій студійний альбом українського гурту The Hardkiss, представлений 19 вересня 2018 року. Особливістю альбому стали вірші вокалісти Юлії Саніної, які можна почути серед композицій.
									</div>
								</div>
							</div>

							<div className="album">
								<img src="https://localhost:8080/api/image/ThePrettyReckless.jpg" alt="Going to Hell"/>
								<div className="description">
									<div className="name">Going to Hell</div>
									<div className="count">12 треків • 45 minutes</div>
									<div className="date">2013 рік</div>
									<div className="desc">
										Going to Hell — другий студійний альбом американського рок-гурту The Pretty Reckless. В США альбом вийшов 12 березня 2014.
									</div>
								</div>
							</div>
						</div>
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