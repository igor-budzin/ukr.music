import React, { Component } from 'react';
import classNames from 'classnames';

import 'universal/assets/styles/commons/select.scss';

export default class Select extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			value: '',
			label: ''
		}
	}

	componentDidMount() {
		this.field.addEventListener("click", this.handleOpenSelect);
		if(this.props.defaultValue && this.props.defaultLabel) {
			this.setState({
				value: this.props.defaultValue,
				label: this.props.defaultLabel
			})
		}
	}

	componentWillUnmount() {
		this.field.removeEventListener("click", this.handleOpenSelect);
	}

	handleOpenSelect = () => {
		this.select.classList.toggle('opened');
	};

	handleChoose = (elem) => {
		this.handleOpenSelect();
		this.setState({
			value: elem.value,
			label: elem.label
		})
	};

	render() {
		return (
				<div className={classNames('select', this.props.className)} ref={elem => this.select = elem}>
					<div className="field" ref={elem => this.field = elem}>{this.state.label}</div>
					<div className="list">
						{
							this.props.options.map((option, index) => {
								return (
												<Option
													checked={option.checked ? option.checked : null}
													key={index}
													handleChoose={this.handleChoose}
													value={option.value}
												>
													{option.label}
												</Option>
											)
							})
						}
					</div>
				</div>
		);
	}
}

const Option = (props) => {
	const onClick = (e) => {
		props.handleChoose({
			value: e.target.getAttribute('data-value'),
			label: e.target.innerHTML
		})
	}
	return (<div className="item" onClick={onClick} data-value={props.value}>{props.children}</div>)
}
