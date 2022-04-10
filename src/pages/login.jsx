import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Input, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { REGISTRATION_PAGE_PATH } from '../constants/routes';

function Login() {
	const [form] = Form.useForm();

	return (
		<div className='login-container'>
			<Typography.Title level={1} style={{ textAlign: 'center', margin: '15px 0' }}>Вход</Typography.Title>

			<Form form={form} className='login-form'>
				<Form.Item
					name='login'
					className='login-form-item'
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
				>
					<Input.Password
						placeholder='Введите пароль'
						size="large"
						prefix={<UserOutlined />}
					/>
				</Form.Item>

				<Button className='login-form-submit' type='primary'>Войти</Button>
				<Typography className='login-form-link'>Нет аккаунта? <Link to={REGISTRATION_PAGE_PATH}>Зарегестрироваться</Link> </Typography>
			</Form>
		</div>
	);
}

export { Login }