import React from 'react';
import { MenuItem } from './MenuItem';
import { menuItemList } from '../../../constants/routes';

function MenuNav(props) {
	const { showMobileMenuContent = true, className } = props;

	return (
		<nav className={className} hidden={!showMobileMenuContent}>
			{menuItemList.map(item => <MenuItem key={item.key} {...item} />)}
		</nav>
	);
}

export { MenuNav };