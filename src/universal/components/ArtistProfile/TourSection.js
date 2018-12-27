// Libraries
import React, { Component } from 'react';

import Button from '../Commons/Button';

export default class TourSection extends Component {

	render() {
		return (
			<div className="profile-section tour">
				<div className="title">
					<span>Найближчий тур</span>

					<a className="link" href="javascript:void(0)">Повний тур</a>
				</div>

				<div className="body">
					<div className="event">
						<div className="date">03/03/2019</div>
						<div className="city">Вроцлав</div>
						<div className="ticket">
							<a href="#">Квитки</a>
						</div>
					</div>
					<div className="event">
						<div className="date">07/03/2019</div>
						<div className="city">Мінськ</div>
						<div className="ticket">
							<a href="#">Квитки</a>
						</div>
					</div>
					<div className="event">
						<div className="date">13/03/2019</div>
						<div className="city">Ужгород</div>
						<div className="ticket">
							<a href="#">Квитки</a>
						</div>
					</div>
					<div className="event">
						<div className="date">13/04/2019</div>
						<div className="city">Полтава</div>
						<div className="ticket">
							<a href="#">Квитки</a>
						</div>
					</div>
					<div className="event">
						<div className="date">15/04/2019</div>
						<div className="city">Кременчук</div>
						<div className="ticket">
							<a href="#">Квитки</a>
						</div>
					</div>
					<div className="event">
						<div className="date">18/04/2019</div>
						<div className="city">Хмельницький</div>
						<div className="ticket">
							<a href="#">Квитки</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
