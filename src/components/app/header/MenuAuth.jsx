import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';

import { logoutAction, refeachState } from '../../../redux/authSlice';

import { useCookies } from '../../../hooks/cookies';
import { useRedirect } from '../../../hooks/redirect';

function MenuAuth(props) {
	const { showMobileMenuContent = true, className } = props;

	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.authReducer.isAuth);

	const { goLogin, goReg } = useRedirect();
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
	);
}

export { MenuAuth };