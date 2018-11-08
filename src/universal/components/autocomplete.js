import React from 'react';

export default class Autocomplete extends React.Component {
	constructor(props) {
		super(props);
	}

	onClick = (event) => {
		event.stopPropagation();
		const item = {
			id: event.currentTarget.dataset.id,
			main_text: event.currentTarget.querySelector('.main-text').textContent,
			secondary_text: event.currentTarget.querySelector('.secondary-text').textContent
		}
		this.props.handlePickAutocomplete(item);
	}

	render() {
		return (
			<div className={"autocomplete"}>
			{
				this.props.autocompleteArray.map((item, index) => {
					return (
						<div className="item" key={item.id + index} data-id={item.place_id} onClick={this.onClick}>
							<div className="main-text">{item.structured_formatting.main_text}</div>
							<div className="secondary-text">{item.structured_formatting.secondary_text}</div>
						</div>
					)
				})
			}
			</div>
		);
	}
}
