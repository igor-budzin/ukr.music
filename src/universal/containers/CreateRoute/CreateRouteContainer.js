// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import GoogleMap from 'universal/components/GoogleMap';
import Sidebar from 'universal/components/Sidebar';
import SaveRouteModal from 'universal/components/SaveRouteModal';
// Actions
import { changeDistanceAction, changeRouteItemsAction } from 'universal/redux/actions/mapActions';
import { saveRouteAction } from 'universal/redux/actions/saveRouteActions';
import { openSaveRouteModalAction, closeSaveRouteModalAction } from 'universal/redux/actions/modalActions';

@connect(mapStateToProps, mapDispatchToProps)
class CreateRouteContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			reloadMap: false,
			routeVisibleType: localStorage.getItem('routeVisibleType') !== null ? localStorage.getItem('routeVisibleType') : 'route'
		}
	}

	onChangeRouteItems = (routeItems) => {
		this.props.changeRouteItems({routeItems: routeItems})
		this.setState({reloadMap: true});
	}

	onChangeType = (type) => {
		this.setState({routeVisibleType: type, reloadMap: true});
	}

	onChangeDistance = (distance) => {
		this.setState({reloadMap: true});
		this.props.changeDistance(distance);
	}

	saveRouteToStorage = (routeName) => {
		this.props.saveRoute({
			routeName: routeName,
			routeItems: JSON.stringify(this.props.routeItems),
			distance: this.props.distance,
			routeVisibleType: this.state.routeVisibleType
		});
	}

	showSaveRouteModal = () => {
		this.props.openSaveRouteModal();
		this.setState({reloadMap: false});
	}

	hideSaveRouteModal = () => {
		this.props.closeSaveRouteModal();
		this.setState({reloadMap: false});
	}

	render() {
		return (
			<Fragment>
				<GoogleMap
					onChangeDistance={this.onChangeDistance}
					routeItems={this.props.routeItems}
					routeVisibleType={this.state.routeVisibleType}
					reloadMap={this.state.reloadMap}
				/>
				<Sidebar
					distance={this.props.distance}
					getRouteItems={this.onChangeRouteItems}
					onChangeType={this.onChangeType}
					showSaveRouteModal={this.showSaveRouteModal}
				/>
				<SaveRouteModal
					saveRouteToStorage={this.saveRouteToStorage}
					visibleSaveRouteModal={this.props.visibleSaveRouteModal}
					hideSaveRouteModal={this.hideSaveRouteModal}
					saveModalLoading={this.props.saveModalLoading}
				/>
			</Fragment>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		distance: state.distanceReducer.distance,
		routeItems: state.routeItemsReducer.routeItems,
		saveModalLoading: state.saveRouteReducer.saveModalLoading,
		visibleSaveRouteModal: state.saveRouteModalReducer.visibleSaveRouteModal
	};
}


function mapDispatchToProps(dispatch, props) {
	return bindActionCreators({
		changeDistance: changeDistanceAction,
		changeRouteItems: changeRouteItemsAction,
		saveRoute: saveRouteAction,
		openSaveRouteModal: openSaveRouteModalAction,
		closeSaveRouteModal: closeSaveRouteModalAction
	}, dispatch);
}

export default CreateRouteContainer;
