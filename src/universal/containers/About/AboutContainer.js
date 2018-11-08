// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(mapStateToProps, mapDispatchToProps)
class AboutContainer extends Component {
	render () {
		return (
			<div className="page-container">
				<h2>About this app</h2>
				<div>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, ducimus odio sit quibusdam dolorum molestiae a! Consequatur ullam dicta ipsum distinctio, libero nostrum quam, sint hic quos facilis, ipsa, repellendus!</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime suscipit nulla tempore cum laboriosam in animi non ut sunt iusto! Voluptatibus sapiente doloremque iste aliquid maiores, labore! Eius, placeat architecto.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem itaque, soluta ipsum reiciendis similique ut qui nisi maxime, animi perferendis voluptatem? Cum quidem excepturi sint, numquam dolorum non, beatae harum!</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, nemo.</p>
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

export default AboutContainer;
