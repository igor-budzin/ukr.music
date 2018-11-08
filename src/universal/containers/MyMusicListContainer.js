// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
// import SavedRoutesList from 'universal/components/SavedRoutesList';
// Actions
// import { getRoutesAction } from 'universal/redux/actions/getRoutesActions';

@connect(mapStateToProps, mapDispatchToProps)
class MyMusicListContainer extends Component {

	render() {
		return (
			<main id="page" className="page clearfix">
				<h2 className="section-title">Моя музика</h2>

				<div className="container clearfix">

					<div className="section-links">
						<a href="#">Популярне</a>
						<a href="#">Нове</a>
						<a href="#">Підбірки</a>
					</div>

					<div className="filters">
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
								<ul>
									<li><a href="#" className="filter-link">Metal</a></li>
									<li><a href="#" className="filter-link">Pop</a></li>
									<li><a href="#" className="filter-link">Piano</a></li>
									<li><a href="#" className="filter-link">Rock</a></li>
									<li><a href="#" className="filter-link">Classical</a></li>
									<li><a href="#" className="filter-link">Country</a></li>
									<li><a href="#" className="filter-link">Electronic</a></li>
								</ul>
								<ul>
									<li><a href="#" className="filter-link">Pop</a></li>
									<li><a href="#" className="filter-link">Piano</a></li>
									<li><a href="#" className="filter-link">Classical</a></li>
									<li><a href="#" className="filter-link">Country</a></li>
									<li><a href="#" className="filter-link">Electronic</a></li>
									<li><a href="#" className="filter-link">Rock</a></li>
									<li><a href="#" className="filter-link">Metal</a></li>
								</ul>
							</div>
						</div>

						<div className="filter-dropdown">
							<span className="bg"></span>
							<a href="#" className="link">Країна <i className="icon-dropdown"></i></a>
							<div className="dropdown-content">
								<ul>
									<li><a href="#" className="filter-link">Україна</a></li>
									<li><a href="#" className="filter-link">США</a></li>
									<li><a href="#" className="filter-link">Канада</a></li>
									<li><a href="#" className="filter-link">Австралія</a></li>
									<li><a href="#" className="filter-link">Польща</a></li>
									<li><a href="#" className="filter-link">Австрія</a></li>
									<li><a href="#" className="filter-link">Японія</a></li>
								</ul>
								<ul>
									<li><a href="#" className="filter-link">Норвегія</a></li>
									<li><a href="#" className="filter-link">Ірландія</a></li>
									<li><a href="#" className="filter-link">Шотландія</a></li>
									<li><a href="#" className="filter-link">Данія</a></li>
								</ul>
							</div>
						</div>
					</div>

				</div>

				<div className="filter-hr"></div>

				<div className="content">
					<div className="playlist clearfix">
						<div className="audio-row">
							<div className="audio-row-cover" style={{'background-image': "url('song/2.jpg')"}}>
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

						<div className="audio-row current">
							<div className="audio-row-cover" style={{'background-image': "url('song/1.jpg')"}}>
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
								<div className="singer"><a href="#">Vivienne Mort</a></div>
								<div className="song"><a href="#">Сліди маленьких рук</a></div>
							</div>
							<div className="audio-row-time">3:52</div>
						</div>

						<div className="audio-row">
							<div className="audio-row-cover" style={{'background-image': "url('song/3.jpg')"}}>
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
								<div className="singer"><a href="#">MILCK</a></div>
								<div className="song"><a href="#">The World is Unravelling</a></div>
							</div>
							<div className="audio-row-time">3:52</div>
						</div>

						<div className="audio-row">
							<div className="audio-row-cover" style={{'background-image': "url('song/2.jpg')"}}>
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
								<div className="singer"><a href="#">Detach</a></div>
								<div className="song"><a href="#">Afterglow</a></div>
							</div>
							<div className="audio-row-time">3:52</div>
						</div>

						<div className="audio-row current">
							<div className="audio-row-cover" style={{'background-image': "url('song/1.jpg')"}}>
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
								<div className="singer"><a href="#">Vivienne Mort</a></div>
								<div className="song"><a href="#">Сліди маленьких рук</a></div>
							</div>
							<div className="audio-row-time">3:52</div>
						</div>

						<div className="audio-row">
							<div className="audio-row-cover" style={{'background-image': "url('song/3.jpg')"}}>
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
								<div className="singer"><a href="#">MILCK</a></div>
								<div className="song"><a href="#">The World is Unravelling</a></div>
							</div>
							<div className="audio-row-time">3:52</div>
						</div>
					</div>

					<br /><br /><br /><br /><br /><br /><br /><br />
				</div>
			</main>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		// routes: state.getRoutesReducer.routes
	};
}


function mapDispatchToProps(dispatch, props) {
	return bindActionCreators({
		// getRoutes: getRoutesAction
	}, dispatch);
}

export default MyMusicListContainer;
