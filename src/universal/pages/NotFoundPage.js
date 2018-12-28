// Libraries
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Header from 'universal/components/Header';

export default class NotFoundPage extends Component {
	render() {
		return (
			<div className="wrapper">
				<div style={{'textAlign': 'center'}}>
					<div style={code}>404</div>
					<div style={text}>Page Not Found :(</div>
					<div>
						<Link style={btn} to="/music">На головну</Link>
					</div>
				</div>
			</div>
		)
	}
}

const code = {
	"fontSize": "150px",
	"fontFamily": "Roboto Condensed",
	"color": "#DC4E41",
	"marginTop": '150px'
}
const text = {
	"fontSize": "40px",
	"fontFamily": "Roboto Condensed",
}
const btn = {
	height: "40px",
	lineHeight: "40px",
	color: "#fff",
	borderRadius: "3px",
	backgroundColor: "#DC4E41",
	textAlign: "center",
	display: "inline-block",
	border: "none",
	fonFamily: "Roboto Condensed",
	fonSize: "16px",
	padding: "0 30px",
	marginTop: "20px"
}



