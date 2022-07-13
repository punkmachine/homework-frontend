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

export const scheduleItemForm = [
	{
		name: 'lesson_name',
		placeholder: 'Выберите предмет',
		type: 'select',
		rules: rules.required,
	},
	{
		name: 'time_start',
		placeholder: 'Время время начала',
		type: 'input',
		rules: rules.required,
	},
	{
		name: 'time_end',
		placeholder: 'Введите время окончания',
		type: 'input',
		rules: rules.required,
	},
	{
		name: 'type_lesson',
		placeholder: 'Выберите тип предмета',
		type: 'select',
		rules: rules.required,
		options: [
			{
				label: 'Онлайн',
				value: 1,
			},
			{
				label: 'Офлайн',
				value: 0,
			},
		],
	},
	{
		name: 'classroom',
		placeholder: 'Введите номер аудитории',
		type: 'input',
		rules: rules.number,
	},
	{
		name: 'teacher',
		placeholder: 'Введите имя преподавателя',
		type: 'input',
		rules: rules.noNumber,
	},
];

export const scheduleItemFormOther = [
	{
		name: 'zoom_id',
		placeholder: 'Введите Zoom ID',
		type: 'input',
		rules: rules.required,
	},
	{
		name: 'zoom_pass',
		placeholder: 'Введите пароль от Zoom',
		type: 'input',
		rules: rules.required,
	},
];