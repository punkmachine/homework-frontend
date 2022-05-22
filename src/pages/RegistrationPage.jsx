import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Typography, message } from 'antd';

import { useRegisterMutation } from '../api/user';
import { useRedirect } from '../hooks/redirect';

import { MainTitle } from '../components/app/MainTitle';
import { InputFormItem } from '../components/app/InputFormItem';

import { registrationForm } from '../constants/form-list';
import { LOGIN_PAGE_PATH } from '../constants/routes';

function Registration() {
	const [form] = Form.useForm();

	const [reg] = useRegisterMutation();
	const { goMain } = useRedirect();

	async function submitRegistration(values) {
		try {
			const { data } = await reg(values);
			const { success, msg } = data;

			if (success) {
				const { jwt } = data.data;
				document.cookie = `jwt=${jwt};max-age=43200;`
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
		<div className='registration-container'>
			<MainTitle text='Регистрация' />

			<Form
				form={form}
				className='registration-form'
				onFinish={submitRegistration}
			>
				{registrationForm.map(item =>
					<InputFormItem
						{...item}
						key={item.name}
						className='registration-form-item'
						size="large"
					/>
				)}
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