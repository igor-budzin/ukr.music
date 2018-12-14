import React, { Component } from 'react';
import classNames from 'classnames';

const Loader = () => {
	return (
		<div className="button-loader">
			<span></span>
			<span></span>
			<span></span>
		</div>
	);
}

export default class Button extends Component {
	render() {
		return (
			<button
				type="button"
				className={classNames('button', this.props.className)}
				onClick={this.props.onClick}
				disabled={this.props.isLoading ? "disabled" : false}
			>
			{
				this.props.isLoading ?
				<Loader /> :
				this.props.children
			}
			</button>
		);
	}
}