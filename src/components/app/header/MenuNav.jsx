import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SCHEDULE_PAGE_PATH } from '../../../constants/routes';

function MenuNav(props) {
	const { pathname } = useLocation();
	const { showMobileMenuContent = true, className } = props;

	const selectMenu = (key) => localStorage.setItem('activeKey', key);

	return (
		<nav className={className} hidden={!showMobileMenuContent}>
			<span
				className={pathname === '/' ? "menu-item active" : "menu-item"}
				onClick={() => selectMenu('/')}
			>
				<Link to='/'>
					Главная
				</Link>
			</span>
			<span
				className={pathname === SCHEDULE_PAGE_PATH ? "menu-item active" : "menu-item"}
				onClick={() => selectMenu(SCHEDULE_PAGE_PATH)}
			>
				<Link to={SCHEDULE_PAGE_PATH}>
					Расписание
				</Link>
			</span>
		</nav>
	);
}

export { MenuNav };