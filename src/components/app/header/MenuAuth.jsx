import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { logoutAction, refeachState } from '../../../redux/authSlice';

import { useCookies } from '../../../hooks/cookies';
import { useRedirect } from '../../../hooks/redirect';

function MenuAuth(props) {
	const { showMobileMenuContent = true, className } = props;

	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.authReducer.isAuth);

	const { goLogin, goReg, goProfile } = useRedirect();
	const { CookiesDelete } = useCookies();

	function clear() {
		CookiesDelete();
		localStorage.clear();
		dispatch(logoutAction());
		dispatch(refeachState());
	}

	return (
		<div className={className} hidden={!showMobileMenuContent}>
			{isAuth
				? (
					<>
						<UserOutlined className='profile-icon' onClick={goProfile} />
						<Button type="link" className='exit-btn' onClick={clear}>Выход</Button>
					</>
				)
				: (
					<>
						<Button type="link" onClick={goLogin}>Вход</Button>
						<Button type="link" onClick={goReg}>Регистрация</Button>
					</>
				)}
		</div>
	);
}

export { MenuAuth };