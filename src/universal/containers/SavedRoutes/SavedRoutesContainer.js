// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { bindActionCreators } from 'redux';
// Components
import SavedRoutesList from 'universal/components/SavedRoutesList';
// Actions
import { getRoutesAction } from 'universal/redux/actions/getRoutesActions';

@connect(mapStateToProps, mapDispatchToProps)
class SavedRoutesContainer extends Component {
	componentDidMount() {
		this.props.getRoutes();
	}

	render() {
		return (
			<div className="page-container">
				<h2>Saved Routes</h2>

				<SavedRoutesList routes={this.props.routes} />
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		routes: state.getRoutesReducer.routes
	};
}


function mapDispatchToProps(dispatch, props) {
	return bindActionCreators({
		getRoutes: getRoutesAction
	}, dispatch);
}

export default SavedRoutesContainer;
