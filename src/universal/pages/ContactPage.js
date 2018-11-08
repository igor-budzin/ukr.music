// Libraries
import React, { Component, Fragment } from 'react';

import ContactContainer from 'universal/containers/Contact/ContactContainer';
import Header from 'universal/components/Header/Header';

class ContactPage extends Component {
	render () {
		return (
			<Fragment>
				<Header />
				<ContactContainer />
			</Fragment>
		);
	}
}

export default ContactPage;
