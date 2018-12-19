import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
	handleLogout = () => {
		window.location.href = 'https://localhost:8080/api/logout';
	}

	render () {
		return (
			<header id="header" className="header">
				<div className="container">
					<div className="item-left">
						<a href="#" className="header-logo">ukr.music</a>
					</div>
					<div className="item-left">
						<ul className="header-nav">
							<li><Link to="/">Головна</Link></li>
							<li><Link to="/music" className="active">Музика</Link></li>
							<li><a href="#">Відео</a></li>
							<li><a href="#">Контакти</a></li>
						</ul>
					</div>
					<div className="item-right">
						<div className="header-user-auth">
							<a href="javascript:void(0)" onClick={this.handleLogout}>Вихід</a>
						</div> 
					</div>
					<div className="item-right">
						<div className="header-lang">
							<a href="#">EN</a>
						</div>
					</div>
				</div>
			</header>
		);
	}
}

export default Header;
