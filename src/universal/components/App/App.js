import React, { Component } from 'react';

import styles from 'universal/assets/styles/styles.scss';

class App extends Component {
	render () {
		return (
			<div className={styles.app}>
				{this.props.children}
			</div>
		);
	}
}

export default App;
