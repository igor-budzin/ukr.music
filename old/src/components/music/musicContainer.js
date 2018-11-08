import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

import Header from '../common/Header.js';

export default class Home extends Component {

	render() {
		return (
			<div className="wrapper">
				<Header />

				<main id="page" className="page clearfix">
					<h2 className="section-title">Популярна музика</h2>

					<div className="container clearfix">
						<div className="section-links">
							<a href="#">Популярне</a>
							<a href="#">Нове</a>
							<a href="#">Підбірки</a>
						</div>

						{/* <div className="filters">
							<div className="filter-dropdown">
								<span className="bg"></span>
								<a href="#" className="link">Жанр <i className="icon-dropdown"></i></a>
								<div className="dropdown-content">
									<ul>
										<li><a href="#" className="filter-link">Classical</a></li>
										<li><a href="#" className="filter-link">Country</a></li>
										<li><a href="#" className="filter-link">Electronic</a></li>
										<li><a href="#" className="filter-link">Metal</a></li>
										<li><a href="#" className="filter-link">Pop</a></li>
										<li><a href="#" className="filter-link">Piano</a></li>
										<li><a href="#" className="filter-link">Rock</a></li>
									</ul>
								</div>
							</div>
						</div> */}
					</div>

					<div className="filter-hr"></div>

					<div className="content">
						<div className="playlist clearfix">
							<div className="audio-row">
								<div className="audio-row-cover">
									<div className="bg">
										<div className="bars">
											<div className="bar"></div>
											<div className="bar"></div>
											<div className="bar"></div>
											<div className="bar"></div>
											<div className="bar"></div>
										</div>
									</div>
								</div>
								<div className="audio-row-desc">
									<div className="singer"><a href="#">The Hardkiss</a></div>
								<div className="song"><a href="#">Make-up</a></div>
								</div>
								<div className="audio-row-time">3:52</div>
							</div>

							<div className="audio-row">
								<div className="audio-row-cover">
									<div className="bg">
										<div className="bars">
											<div className="bar"></div>
											<div className="bar"></div>
											<div className="bar"></div>
											<div className="bar"></div>
											<div className="bar"></div>
										</div>
									</div>
								</div>
								<div className="audio-row-desc">
									<div className="singer"><a href="#">The Hardkiss</a></div>
								<div className="song"><a href="#">Make-up</a></div>
								</div>
								<div className="audio-row-time">3:52</div>
							</div>

							<div className="audio-row">
								<div className="audio-row-cover">
									<div className="bg">
										<div className="bars">
											<div className="bar"></div>
											<div className="bar"></div>
											<div className="bar"></div>
											<div className="bar"></div>
											<div className="bar"></div>
										</div>
									</div>
								</div>
								<div className="audio-row-desc">
									<div className="singer"><a href="#">The Hardkiss</a></div>
								<div className="song"><a href="#">Make-up</a></div>
								</div>
								<div className="audio-row-time">3:52</div>
							</div>

						</div>


					</div>
					<div className="sidebar"></div>

				</main>
			</div>
		)
	}
}
