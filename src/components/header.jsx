import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Typography, Button } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';

import { useRedirect } from '../hooks/redirect';

import { SCHEDULE_PAGE_PATH, MAIN_PAGE_PATH } from '../constants/routes';

function Header() {
	const { goback, goLogin, goReg } = useRedirect();
	const { pathname } = useLocation();

	const [hidden, setHidden] = useState(true);
	const [activeKey, setActiveKey] = useState('main');

	function selectMenu({ key }) {
		setActiveKey(key);
		localStorage.setItem('activeKey', key);
	}

	useEffect(() => {
		setHidden(pathname === MAIN_PAGE_PATH);
	}, [pathname]);

	useEffect(() => {
		setActiveKey(localStorage.getItem('activeKey') ?? 'main');
	}, []);

	return (
		<header className="header">
			<nav className="menu">
				<div className='back' onClick={goback} hidden={hidden}>
					<LeftCircleOutlined className='back-icon' />
					<Typography>Назад</Typography>
				</div>
				<Menu
					mode="horizontal"
					selectedKeys={[activeKey]}
					onSelect={selectMenu}
				>
					<Menu.Item key='main'>
						<Link to='/'>Главная</Link>
					</Menu.Item>
					<Menu.Item key='schedule'>
						<Link to={SCHEDULE_PAGE_PATH}>Расписание</Link>
					</Menu.Item>
				</Menu>
				<div className="auth-controller">
					<Button type="link" onClick={goLogin}>Вход</Button>
					<Button type="link" onClick={goReg}>Регистрация</Button>
				</div>
			</nav>
		</header>
	);
}

export { Header };