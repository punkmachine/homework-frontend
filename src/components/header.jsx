import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Typography } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';

import { useRedirect } from '../hooks/redirect';
import { usePathname } from '../hooks/pathname';

import { SCHEDULE_PAGE_PATH, MAIN_PAGE_PATH } from '../constants/routes';

function Header() {
	const { goback } = useRedirect();
	const { pathname } = usePathname();

	const [hidden, setHidden] = useState(true);

	useEffect(() => {
		setHidden(pathname === MAIN_PAGE_PATH);
	}, [pathname]);

	return (
		<header className="header">
			<nav className="menu">
				<div className='back' onClick={goback} hidden={hidden}>
					<LeftCircleOutlined className='back-icon' />
					<Typography>Назад</Typography>
				</div>
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