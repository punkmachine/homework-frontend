import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Typography, Button } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';

import { logoutAction, refeachState } from '../redux/authSlice';
import { useRedirect } from '../hooks/redirect';
import { useCookies } from '../hooks/cookies';

import { SCHEDULE_PAGE_PATH, MAIN_PAGE_PATH } from '../constants/routes';

function Header() {
	const { pathname } = useLocation();
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.authReducer.isAuth);

	const { goback, goLogin, goReg } = useRedirect();
	const { CookiesDelete } = useCookies();

	const [hidden, setHidden] = useState(true);
	const [activeKey, setActiveKey] = useState('main');

	function selectMenu(key) {
		setActiveKey(key);
		localStorage.setItem('activeKey', key);
	}

	function clear() {
		CookiesDelete();
		localStorage.clear();
		dispatch(logoutAction());
		dispatch(refeachState());
	}

	useEffect(() => {
		setHidden(pathname === MAIN_PAGE_PATH);
	}, [pathname]);

	useEffect(() => {
		setActiveKey(localStorage.getItem('activeKey') ?? 'main');
		dispatch(refeachState());
	}, []);

	return (
		<header className="header">
			<div className='back' onClick={goback} hidden={hidden}>
				<LeftCircleOutlined className='back-icon' />
				<Typography>Назад</Typography>
			</div>
			<nav className="menu">
				<span
					className={activeKey === 'main' ? "menu-item active" : "menu-item"}
					onClick={() => selectMenu('main')}
				>
					<Link to='/'>
						Главная
					</Link>
				</span>
				<span
					className={activeKey === 'schedule' ? "menu-item active" : "menu-item"}
					onClick={() => selectMenu('schedule')}
				>
					<Link to={SCHEDULE_PAGE_PATH}>
						Расписание
					</Link>
				</span>
			</nav>
			<div className="auth-controller">
				{isAuth
					? (
						<>
							<Button type="link" onClick={clear}>Выход</Button>
						</>
					)
					: (
						<>
							<Button type="link" onClick={goLogin}>Вход</Button>
							<Button type="link" onClick={goReg}>Регистрация</Button>
						</>
					)}
			</div>
		</header>
	);
}

export { Header };