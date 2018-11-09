import React from 'react';

export default class MusicFilter extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="filters">
				<div className="filter-dropdown">
					<span className="bg"></span>
					<a href="#" className="link">Жанр <i className="icon-dropdown"></i></a>
					<div className="dropdown-content">
						<ul>
							<li><a href="#" className="filter-link">Classical</a></li>
							<li><a href="#" className="filter-link">Country</a></li>
							<li><a href="#" className="filter-link">Electronic</a></li>
							<li><a href="#" className="filter-link">Metal</a></li>
							<li><a href="#" className="filter-link">Pop</a></li>
							<li><a href="#" className="filter-link">Piano</a></li>
							<li><a href="#" className="filter-link">Rock</a></li>
						</ul>
						<ul>
							<li><a href="#" className="filter-link">Metal</a></li>
							<li><a href="#" className="filter-link">Pop</a></li>
							<li><a href="#" className="filter-link">Piano</a></li>
							<li><a href="#" className="filter-link">Rock</a></li>
							<li><a href="#" className="filter-link">Classical</a></li>
							<li><a href="#" className="filter-link">Country</a></li>
							<li><a href="#" className="filter-link">Electronic</a></li>
						</ul>
						<ul>
							<li><a href="#" className="filter-link">Pop</a></li>
							<li><a href="#" className="filter-link">Piano</a></li>
							<li><a href="#" className="filter-link">Classical</a></li>
							<li><a href="#" className="filter-link">Country</a></li>
							<li><a href="#" className="filter-link">Electronic</a></li>
							<li><a href="#" className="filter-link">Rock</a></li>
							<li><a href="#" className="filter-link">Metal</a></li>
						</ul>
					</div>
				</div>

				<div className="filter-dropdown">
					<span className="bg"></span>
					<a href="#" className="link">Країна <i className="icon-dropdown"></i></a>
					<div className="dropdown-content">
						<ul>
							<li><a href="#" className="filter-link">Україна</a></li>
							<li><a href="#" className="filter-link">США</a></li>
							<li><a href="#" className="filter-link">Канада</a></li>
							<li><a href="#" className="filter-link">Австралія</a></li>
							<li><a href="#" className="filter-link">Польща</a></li>
							<li><a href="#" className="filter-link">Австрія</a></li>
							<li><a href="#" className="filter-link">Японія</a></li>
						</ul>
						<ul>
							<li><a href="#" className="filter-link">Норвегія</a></li>
							<li><a href="#" className="filter-link">Ірландія</a></li>
							<li><a href="#" className="filter-link">Шотландія</a></li>
							<li><a href="#" className="filter-link">Данія</a></li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
