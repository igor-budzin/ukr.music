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
class MusicPlayerContainer extends Component {
	

	render() {
		return (
			<div className="player">
				<div className="controls">
					<div className="btn prev"></div>
					<div className="btn play-control"></div>
					<div className="btn next"></div>
				</div>
			</div>
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

export default MusicPlayerContainer;
