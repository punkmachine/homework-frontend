import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Typography, Button } from 'antd';
import { LeftCircleOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';

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
	const [mobileMenu, setMobileMenu] = useState(false);
	const [showMobileMenuContent, setShowMobileMenuContent] = useState(false);

	const selectMenu = (key) => localStorage.setItem('activeKey', key);
	const toggleMobileMenu = () => setShowMobileMenuContent((prevState) => !prevState);

	function clear() {
		CookiesDelete();
		localStorage.clear();
		dispatch(logoutAction());
		dispatch(refeachState());
	}

	useEffect(() => {
		setHidden(pathname === MAIN_PAGE_PATH);
		setShowMobileMenuContent(false);
	}, [pathname]);

	useEffect(() => {
		dispatch(refeachState());
		setMobileMenu(window.screen.width <= 425);
	}, []);

	console.log(mobileMenu);

	return (
		<header className="header">
			{mobileMenu ?
				<div>
					<MenuOutlined className='hamburger' onClick={toggleMobileMenu} />
					<div className="mobile-menu-content" hidden={!showMobileMenuContent}>
						<CloseOutlined className='close-menu' onClick={toggleMobileMenu} />
						<nav className="mobile-menu-nav" hidden={!showMobileMenuContent}>
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
						<div className="mobile-menu-auth" hidden={!showMobileMenuContent}>
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
					</div>
					<div className="hz" hidden={!showMobileMenuContent} onClick={toggleMobileMenu} />
				</div>
				: (<div>
					<div className='back' onClick={goback} hidden={hidden}>
						<LeftCircleOutlined className='back-icon' />
						<Typography>Назад</Typography>
					</div>
					<nav className="menu">
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
				</div>)
			}
		</header>
	);
}

export { Header };