// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import MusicFilter from 'universal/components/MusicFilter';
import PlayList from 'universal/components/PlayList/PlayList';
// Actions
// import { getRoutesAction } from 'universal/redux/actions/getRoutesActions';

@connect(mapStateToProps, mapDispatchToProps)
class MyMusicListContainer extends Component {
	render() {
		return (
			<main id="page" className="page clearfix">
				<h2 className="section-title">Моя музика</h2>

				<div className="container clearfix">

{/*					<div className="section-links">
						<a href="#">Популярне</a>
						<a href="#">Нове</a>
						<a href="#">Підбірки</a>
					</div>*/}

					<MusicFilter />

				</div>

				<div className="filter-hr"></div>

				<div className="content">
					<PlayList />

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
