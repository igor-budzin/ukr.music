import React, { Component } from 'react';
import { Button } from 'antd';

function List(data) {
	const routesArray = data.routes;

	if(routesArray !== null && routesArray.length > 0) {
		const html = routesArray.map((item, index) => {
			const routeItems = JSON.parse(item.points);
			let point = routeItems.map((route) => route.main_text);
			return (
				<tr className="route" key={item.name + index}>
					<td>{item.name}</td>
					<td>{point.join(', ')}</td>
					<td>{`${item.distance} km`}</td>
					<td>
						<span className="btn-wrap">
							<Button type="primary">Edit</Button>
							<Button type="danger">Delete</Button>
						</span>
					</td>
				</tr>
			);
		});
		return html;
	}
	else {
		// console.log('nuuuuuuuuuuuuuuul');
		return null;
	}
	// return <tr><td>ddd</td></tr>
}

class SavedRoutesList extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};
	}

	render() {
		const routesArr = this.props.routes;
		return (
			<table className="saved-routes-list">
				<thead>
					<tr>
						<td>Route Name</td>
						<td>Route Points</td>
						<td>Distance</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					<List routes={routesArr} />
				</tbody>
			</table>
		);
	}
}

export default SavedRoutesList;