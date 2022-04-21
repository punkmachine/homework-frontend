import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Input, Typography, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { useRegisterMutation } from '../api/user';
import { rules } from '../utils/rules';
import { LOGIN_PAGE_PATH } from '../constants/routes';

function Registration() {
	const [form] = Form.useForm();
	const [reg] = useRegisterMutation();

	async function submitRegistration(values) {
		try {
			const { data } = await reg(values);
			const { success, msg } = data;

			if (success) {
				message.success(msg);
			} else {
				message.error(msg);
			}
		} catch (error) {
			message.error('catch error:', error);
			throw error;
		}
	}

	return (
		<div className='registration-container'>
			<Typography.Title level={1} style={{ textAlign: 'center', margin: '15px 0' }}>Регистрация</Typography.Title>

			<Form
				form={form}
				className='registration-form'
				onFinish={submitRegistration}
			>
				<Form.Item
					name='name'
					className='registration-form-item'
					rules={rules.required}
				>
					<Input
						placeholder='Введите ваше имя'
						size="large"
						prefix={<UserOutlined />}
					/>
				</Form.Item>
				<Form.Item
					name='login'
					className='registration-form-item'
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
					className='registration-form-item'
					rules={rules.password}
				>
					<Input.Password
						placeholder='Введите пароль'
						size="large"
						prefix={<UserOutlined />}
					/>
				</Form.Item>
				<Form.Item
					name='repeatPassword'
					className='registration-form-item'
					rules={rules.confirmPassword}
				>
					<Input.Password
						placeholder='Повторите пароль'
						size="large"
						prefix={<UserOutlined />}
					/>
				</Form.Item>

				<Button
					className='registration-form-submit'
					type='primary'
					htmlType="submit"
				>
					Зарегестрироваться
				</Button>
				<Typography className='registration-form-link'>
					Уже есть аккаунт?
					<Link to={LOGIN_PAGE_PATH}> Войти</Link>
				</Typography>
			</Form>
		</div>
	);
}

export { Registration }