import React, {Component, Fragment} from 'react';
import {Link, NavLink} from 'react-router-dom';

export default class Header extends Component {
	render() {
		return (
			<header id="header" className="header">
				<div className="container">
					<div className="item-left">
						<a href="#" className="header-logo">ukr.music</a>
					</div>
					<div className="item-left">
						<ul className="header-nav">
							<li><NavLink activeClassName="active" to="/404">Головна</NavLink></li>
							<li><NavLink activeClassName="active" to="/music">Музика</NavLink></li>
							<li><NavLink activeClassName="active" to="/404">Відео</NavLink></li>
							<li><NavLink activeClassName="active" to="/404">Контакти</NavLink></li>
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
					<div className="item-right">
						<div className="header-search">
							<i className="icon icon-search"></i>
							<input type="text" placeholder="Пошук"></input>
						</div>
					</div>
				</div>
			</header>
		)
	}
}
