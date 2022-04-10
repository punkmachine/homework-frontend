import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Input, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { LOGIN_PAGE_PATH } from '../constants/routes';

function Registration() {
	const [form] = Form.useForm();

	return (
		<div className='registration-container'>
			<Typography.Title level={1} style={{ textAlign: 'center', margin: '15px 0' }}>Регистрация</Typography.Title>

			<Form form={form} className='registration-form'>
				<Form.Item
					name='name'
					className='registration-form-item'
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
				>
					<Input.Password
						placeholder='Повторите пароль'
						size="large"
						prefix={<UserOutlined />}
					/>
				</Form.Item>

				<Button className='registration-form-submit' type='primary'>Зарегестрироваться</Button>
				<Typography className='registration-form-link'>Уже есть аккаунт? <Link to={LOGIN_PAGE_PATH}>Войти</Link> </Typography>
			</Form>
		</div>
	);
}

export { Registration }