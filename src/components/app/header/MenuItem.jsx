import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function MenuItem(props) {
	const { itemText, itemLink } = props;
	const { pathname } = useLocation();

	const selectMenu = (key) => localStorage.setItem('activeKey', key);

	return (
		<span
			className={pathname === itemLink ? "menu-item active" : "menu-item"}
			onClick={() => selectMenu(itemLink)}
		>
			<Link to={itemLink}>
				{itemText}
			</Link>
		</span>
	);
}

export { MenuItem };