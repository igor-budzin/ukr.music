import React from 'react';
import axios from 'axios';
import {Checkbox} from 'antd';

import Autocomplete from './autocomplete';
import RouteList from './RouteList'

// import 'antd/lib/checkbox/style';

export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inputText: '',
			autocompleteArray: [],
			routeItems: [],
			checkedType: localStorage.getItem('routeVisibleType') === 'marker' ? true : false
		};

		this.autocompleteService = new google.maps.places.AutocompleteService();
	}

	onChange = (event) => {
		this.setState({inputText: event.target.value});
		const _this = this;
		if(this.state.inputText.length >= 1) {
			this.autocompleteService.getQueryPredictions({input: this.state.inputText}, (response) => {
				if(Array.isArray(response)) {
					_this.setState({autocompleteArray: response});
				}
				else {
					this.setState({autocompleteArray: []});
				}
			});
		}
		else if(event.target.value.length === 0) {
			this.setState({autocompleteArray: []});
		}
	}

	handlePickAutocomplete = (item) => {
		this.fieldFrom.value = '';
		this.setState({autocompleteArray: [], inputText: ''});

		const placesService = new google.maps.places.PlacesService(document.getElementById('map2'));

		placesService.getDetails({placeId: item.id}, (place, status) => {
			if(status == google.maps.places.PlacesServiceStatus.OK) {
				item.lat = place.geometry.location.lat();
				item.lng = place.geometry.location.lng();
				const tmpRouteItemsArray = this.state.routeItems;
				tmpRouteItemsArray.push(item);
				this.setState({routeItems: tmpRouteItemsArray});
				this.props.getRouteItems(tmpRouteItemsArray);
			}
			else throw new Error('Get coordinate: something went wrong');
		});
	}

	onChangeType = (event) => {
		this.setState({checkedType: !this.state.checkedType}, () => {
			const type = this.state.checkedType ? 'marker' : 'route';
			this.props.onChangeType(type);
			localStorage.setItem('routeVisibleType', type);
		});
	}

	onChangeTheme = (event) => {
		console.log(event.target.checked);
	}

	onDeleteRouteItem = (id) => {
		let tmpRouteItems = this.state.routeItems.filter((item) => {
			return item.id !== id;
		});
		this.setState({routeItems: tmpRouteItems})
		this.props.getRouteItems(tmpRouteItems);
	}

	render() {
		return (
			<React.Fragment>
				<aside>
					<input ref={(node) => {this.fieldFrom = node}} type="text" className="field-from" placeholder="Place" onChange={this.onChange} />

					<div className="checkbox-wrapper">
						<label htmlFor="checkbox" className="left-label">Route</label>
						<input
							onChange={this.onChangeType}
							checked={this.state.checkedType}
							type="checkbox"
							className="switcher"
							id="checkbox"
						/>
						<label htmlFor="checkbox">Markers</label>
					</div>

					<Checkbox className="theme-checkbox" onChange={this.onChangeTheme}>Light theme</Checkbox>

					{this.state.autocompleteArray.length > 0 ? <Autocomplete handlePickAutocomplete={this.handlePickAutocomplete} autocompleteArray={this.state.autocompleteArray} /> : ''}
				</aside>
				<RouteList
					distance={this.props.distance}
					routeItems={this.state.routeItems}
					onDeleteRouteItem={this.onDeleteRouteItem}
					showSaveRouteModal={this.props.showSaveRouteModal}
				/>
			</React.Fragment>
		);
	}
}
