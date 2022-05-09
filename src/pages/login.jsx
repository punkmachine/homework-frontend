import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Input, Typography, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { useLoginMutation } from '../api/user';
import { loginAction } from '../redux/authSlice';

import { useRedirect } from '../hooks/redirect';

import { rules } from '../utils/rules';
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
			<Typography.Title level={1} style={{ textAlign: 'center', margin: '15px 0' }}>Вход</Typography.Title>

			<Form
				form={form}
				className='login-form'
				onFinish={submitLogin}
			>
				<Form.Item
					name='login'
					className='login-form-item'
					rules={rules.email}
				>
					<Input
						placeholder='Введите логин'
						size="large"
						prefix={<UserOutlined />}
					/>
				</Form.Item>
				<Form.Item
					name='password'
					className='login-form-item'
					rules={rules.password}
				>
					<Input.Password
						placeholder='Введите пароль'
						size="large"
						prefix={<UserOutlined />}
					/>
				</Form.Item>

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