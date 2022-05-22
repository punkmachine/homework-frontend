import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Input, Typography, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { loginAction } from '../redux/authSlice';

import { useLoginMutation } from '../api/user';
import { useRedirect } from '../hooks/redirect';

import { MainTitle } from '../components/app/MainTitle';
import { InputFormItem } from '../components/app/InputFormItem';

import { rules } from '../utils/rules';

import { loginForm } from '../constants/form-list';
import { REGISTRATION_PAGE_PATH } from '../constants/routes';

function Login() {
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	const [login] = useLoginMutation();
	const { goMain } = useRedirect();

	async function submitLogin(values) {
		try {
			const { data } = await login(values);
			const { success, msg, jwt } = data;

			if (success) {
				document.cookie = `jwt=${jwt};max-age=43200;`
				dispatch(loginAction(data));
				message.success(msg);
				goMain();
			} else {
				message.error(msg);
			}
		} catch (error) {
			message.error('catch error:', error);
			throw error;
		}
	}

	return (
		<div className='login-container'>
			<MainTitle text='Вход' />

			<Form
				form={form}
				className='login-form'
				onFinish={submitLogin}
			>
				{loginForm.map(item =>
					<InputFormItem
						{...item}
						key={item.name}
						className='login-form-item'
						size="large"
					/>
				)}
				<Button
					className='login-form-submit'
					type='primary'
					htmlType="submit"
				>
					Войти
				</Button>
				<Typography className='login-form-link'>Нет аккаунта? <Link to={REGISTRATION_PAGE_PATH}>Зарегестрироваться</Link> </Typography>
			</Form>
		</div>
	);
}

export { Login }