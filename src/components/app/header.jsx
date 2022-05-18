import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Typography } from 'antd';
import { LeftCircleOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';

import { refeachState } from '../../redux/authSlice';
import { useRedirect } from '../../hooks/redirect';

import { MenuNav } from './header/MenuNav';
import { MenuAuth } from './header/MenuAuth';

import { MAIN_PAGE_PATH } from '../../constants/routes';

function Header() {
	const { pathname } = useLocation();
	const dispatch = useDispatch();

	const mobileMenu = window.screen.width <= 425;

	const { goback } = useRedirect();

	const [hidden, setHidden] = useState(true);
	const [showMobileMenuContent, setShowMobileMenuContent] = useState(false);

	const toggleMobileMenu = () => setShowMobileMenuContent((prevState) => !prevState);

	useEffect(() => {
		setHidden(pathname === MAIN_PAGE_PATH);
		setShowMobileMenuContent(false);
	}, [pathname]);

	useEffect(() => {
		dispatch(refeachState());
	}, []);

	return (
		<header className="header">
			{mobileMenu ?
				<div>
					<MenuOutlined className='hamburger' onClick={toggleMobileMenu} />
					<div className="mobile-menu-content" hidden={!showMobileMenuContent}>
						<CloseOutlined className='close-menu' onClick={toggleMobileMenu} />
						<MenuNav
							showMobileMenuContent={showMobileMenuContent}
							className="mobile-menu-nav"
						/>
						<MenuAuth
							showMobileMenuContent={showMobileMenuContent}
							className="mobile-menu-auth"
						/>
					</div>
					<div className="hz" hidden={!showMobileMenuContent} onClick={toggleMobileMenu} />
				</div>
				: (<div>
					<div className='back' onClick={goback} hidden={hidden}>
						<LeftCircleOutlined className='back-icon' />
						<Typography>Назад</Typography>
					</div>
					<MenuNav className="menu" />
					<div className="auth-controller">
						<MenuAuth className="auth-controller" />
					</div>
				</div>)
			}
		</header>
	);
}

export { Header };