import { rules } from '../utils/rules';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

export const registrationForm = [
	{
		name: 'name',
		placeholder: 'Введите ваше имя',
		type: 'input',
		rules: rules.required,
		icon: UserOutlined,
	},
	{
		name: 'login',
		placeholder: 'Введите логин',
		type: 'input',
		rules: rules.login,
		icon: UserOutlined,
	},
	{
		name: 'password',
		placeholder: 'Введите пароль',
		type: 'password',
		rules: rules.password,
		icon: LockOutlined,
	},
	{
		name: 'repeatPassword',
		placeholder: 'Повторите пароль',
		type: 'password',
		rules: rules.confirmPassword,
		icon: LockOutlined,
	},
];

export const loginForm = [
	{
		name: 'login',
		placeholder: 'Введите логин',
		type: 'input',
		rules: rules.login,
		icon: UserOutlined,
	},
	{
		name: 'password',
		placeholder: 'Введите пароль',
		type: 'password',
		rules: rules.password,
		icon: LockOutlined,
	}
];