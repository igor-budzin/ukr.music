// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import MusicFilter from 'universal/components/MusicFilter';
import PlayList from 'universal/components/PlayList/PlayList';
import EmptyPlayList from 'universal/components/PlayList/EmptyPlayList';
// Actions
import { getMusicAction } from 'universal/redux/actions/getMusicActions';

@connect(mapStateToProps, mapDispatchToProps)
class MyMusicListContainer extends Component {
	componentDidMount() {
		this.props.getMusic();
	}

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
					{
						this.props.playlist.length > 0 ?
						<PlayList playlist={this.props.playlist} /> :
						<EmptyPlayList />
					}

					<br /><br /><br /><br /><br /><br /><br /><br />
				</div>
			</main>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		playlist: state.getMusicReducer.music
	};
}


function mapDispatchToProps(dispatch, props) {
	return bindActionCreators({
		getMusic: getMusicAction
	}, dispatch);
}

export default MyMusicListContainer;
