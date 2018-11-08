import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Form, Input } from 'antd';

export default class SaveRouteModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			
		};
	}

	handleCancel = () => {
		this.props.hideSaveRouteModal();
	}

	handleOk = () => {
		if(this.input.value) {
			this.props.saveRouteToStorage(this.input.value);
		}
	}

	render() {
		return (
			<Modal
				title="Enter the name of the route"
				visible={this.props.visibleSaveRouteModal}
				onOk={this.handleOk}
				onCancel={this.handleCancel}
				confirmLoading={this.props.saveModalLoading}
				okText="Save"
			>
				<Form.Item
					help="This name will be displayed in the list of saved routes"
					validateStatus={this.state.validateStatus}
				>
					<Input
						ref={node => (this.input = ReactDOM.findDOMNode(node))} 
						size="large"
						id="route-name"
						name="route-name"
						onPressEnter={this.handleOk}
					/>
				</Form.Item>
			</Modal>
		);
	}
}
