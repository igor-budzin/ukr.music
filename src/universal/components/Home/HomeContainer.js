// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import MusicSection from 'universal/components/Sections/MusicSection';
import AlbumsSection from 'universal/components/Sections/AlbumsSection';
// import MusicFilter from 'universal/components/MusicFilter';
// import PlayList from 'universal/components/PlayList/PlayList';
// import EmptyPlayList from 'universal/components/PlayList/EmptyPlayList';
// Actions
// import { getMusicAction } from 'universal/redux/actions/getMusicActions';

@connect(mapStateToProps, mapDispatchToProps)
class HomeContainer extends Component {
	componentDidMount() {

	}

	render() {
		return (
			<main id="page" className="page home clearfix">
				<h2 className="section-title">Головна</h2>

				<div className="content">
					<MusicSection
						title="Набувають популярності"
						data={data}
					/>
					<AlbumsSection />
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


const data =[{"_id":"5c879cdd0b050b1810a2b686","link":"1552391387977_Кораблі_-_The_Hardkiss.mp3","title":"Кораблі","artists":"The Hardkiss","duration":203.938,"picture":"Кораблі_-_The_Hardkiss.jpg"},{"_id":"5c8798965cf9c11f68e05886","link":"1552390292464_Free_Me_-_The_Hardkiss.mp3","title":"Free Me","artists":"The Hardkiss","duration":192.313,"picture":"Free_Me_-_The_Hardkiss.jpg"},{"_id":"5c87965e5cf9c11f68e05885","link":"1552389725705_Привіт_-_The_Hardkiss.mp3","title":"Привіт","artists":"The Hardkiss","duration":49.92,"picture":"Привіт_-_The_Hardkiss.jpg"},{"_id":"5c8793025cf9c11f68e05884","link":"1552388864333_Журавлі_-_The_Hardkiss_.mp3","title":"Журавлі","artists":"The Hardkiss","duration":169.117,"picture":"Журавлі_-_The_Hardkiss_.jpg"}];

function mapDispatchToProps(dispatch, props) {
	return bindActionCreators({
		// getMusic: getMusicAction
	}, dispatch);
}

export default HomeContainer;
