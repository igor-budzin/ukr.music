// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
// import MusicFilter from 'universal/components/MusicFilter';
// import PlayList from 'universal/components/PlayList/PlayList';
// import EmptyPlayList from 'universal/components/PlayList/EmptyPlayList';
// Actions
// import { getMusicAction } from 'universal/redux/actions/getMusicActions';

@connect(mapStateToProps, mapDispatchToProps)
class HomeContainer extends Component {
	

	render() {
		return (
			<main id="page" className="page home clearfix">
				<h2 className="section-title">Головна</h2>

				<div className="content">
					<div className="grid-row">
						<div className="grid-item grid-item--double-v grid-item--double-h popular-singer">
							<div className="bg"></div>
							<span className="title">Популярні виконавці</span>
						</div>
						<div className="grid-item offset-0 offset-b album">
							<div className="bg"></div>
							<span className="title">Нові альбоми</span>
						</div>
						<div className="grid-item top-songs offset-0">
							<div className="bg"></div>
							<span className="title">Популярні<br />виконавці</span>
						</div>
					</div>

					<div className="grid-row">
						<div style={{"float": "left", "width": "211px"}} className="offset-r">
							<div className="grid-item offset-b album">
								<div className="bg"></div>
								<span className="title">Нові альбоми</span>
							</div>
							<div className="grid-item popular-singer">
								<div className="bg"></div>
								<span className="title">Популярні<br />виконавці</span>
							</div>
						</div>
						<div className="grid-item grid-item--double-v grid-item--double-h offset-0 popular-singer">
							<div className="bg"></div>
							<span className="title">Популярні виконавці</span>
						</div>
					</div>
				</div>
			</main>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		// playlist: state.getMusicReducer.music
	};
}


function mapDispatchToProps(dispatch, props) {
	return bindActionCreators({
		// getMusic: getMusicAction
	}, dispatch);
}

export default HomeContainer;
