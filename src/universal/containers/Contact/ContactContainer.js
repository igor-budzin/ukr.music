// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const { TextArea } = Input;

@connect(mapStateToProps, mapDispatchToProps)
class ContactContainer extends Component {
	handleSubmit() {

	}

	render () {
		return (
			<div className="page-container contact-form">
				<h2>Contacts</h2>

				<div className="form">
					<Form onSubmit={this.handleSubmit} className="login-form">
						<Form.Item>
							<Input placeholder="Name" />
						</Form.Item>
						<Form.Item>
							<Input placeholder="Subject" />
						</Form.Item>
						<Form.Item>
							<TextArea rows={4} placeholder="Description" />
						</Form.Item>
						<Form.Item>
							<Button type="primary" style={{width: 100}}>Send</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {};
}

function mapDispatchToProps(dispatch, props) {
	return {};
}

export default ContactContainer;
