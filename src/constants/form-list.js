import { rules } from '../utils/rules';

export const registrationForm = [
	{
		name: 'name',
		placeholder: 'Введите ваше имя',
		type: 'input',
		rules: rules.required,
	},
	{
		name: 'login',
		placeholder: 'Введите логин',
		type: 'input',
		rules: rules.login,
	},
	{
		name: 'password',
		placeholder: 'Введите пароль',
		type: 'password',
		rules: rules.password,
	},
	{
		name: 'repeatPassword',
		placeholder: 'Повторите пароль',
		type: 'password',
		rules: rules.confirmPassword,
	},
];

export const loginForm = [
	{
		name: 'login',
		placeholder: 'Введите логин',
		type: 'input',
		rules: rules.login,
	},
	{
		name: 'password',
		placeholder: 'Введите пароль',
		type: 'password',
		rules: rules.password,
	}
];