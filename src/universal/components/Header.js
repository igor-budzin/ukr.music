import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
	render () {
		return (
			<header id="header" className="header">
				<div className="container">
					<div className="item-left">
						<a href="#" className="header-logo">ukr.music</a>
					</div>
					<div className="item-left">
						<ul className="header-nav">
							<li><a href="#">Головна</a></li>
							<li><Link className="active" to="/my-music">Музика</Link></li>
							<li><a href="#">Відео</a></li>
							<li><a href="#">Контакти</a></li>
						</ul>
					</div>
					<div className="item-right">
						<div className="header-user-auth">
							<a href="#">Вхід</a>
							<a href="#">Реєстрація</a>
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
