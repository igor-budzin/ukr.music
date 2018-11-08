import React from 'react';
import {Button} from 'antd';

// import 'antd/lib/button/style';

const List = (props) => {
	if(props.routeItems.length > 0) {
		let list = props.routeItems.map((item, i) => {
			return (
				<div className="item" key={item.id + i} data-id={item.id}>
					<div className="main-text">{item.main_text}</div>
					<div className="secondary-text">{item.secondary_text}</div>
					<a onClick={() => props.onDeleteRouteItem(item.id)} href="#" className="remove-btn"></a>
				</div>
			);
		});

		return (
			<React.Fragment>
				<div className="route-list">
					{list}
				</div>
				<Button className="save-btn" type="primary" onClick={props.showSaveRouteModal}>Save</Button>
				<div className="distance">
					{props.distance > 0 ? `Distance: ~ ${props.distance} km` : null}
				</div>
			</React.Fragment>
		);
	}
	else {
		return <span className="empty-message">No point yet</span>
	}
}

export default class RouteList extends React.Component {
	constructor(props) {
		super(props);
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return this.props.routeItems.length === nextProps.routeItems.length;
	// }

	render() {
		return (
			<section>
				<List {...this.props} />
			</section>
		);
	}
}
