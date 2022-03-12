import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { SCHEDULE_PAGE_PATH } from '../constants/routes';

function Header() {
	return (
		<header className="header">
			<nav className="menu">
				<Menu mode="horizontal">
					<Menu.Item key='main'>
						<Link to='/'>Главная</Link>
					</Menu.Item>
					<Menu.Item key='schedule'>
						<Link to={SCHEDULE_PAGE_PATH}>Расписание</Link>
					</Menu.Item>
				</Menu>
			</nav>
		</header>
	);
}

export { Header };