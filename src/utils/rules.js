export const rules = {
	email: [
		{
			required: true,
			pattern:
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			message: 'Не валидный email',
		},
	],
	login: [
		{
			required: true,
			message: 'Обязательное поле',
		}
	],
	password: [
		{
			required: true,
			message: 'Обязательное поле',
		},
		{
			pattern: new RegExp(/(?=.*[a-z])(?=.*[0-9])(?=.{8,})/),
			message:
				'Пароль должен состоять не менее чем из 8 символов и содержать строчные вуквы латинского алфавита и цифры',
		},
	],
	confirmPassword: [
		{
			required: true,
			message: 'Обязательное поле',
		},
		({ getFieldValue }) => ({
			validator(_, value) {
				if (!value || getFieldValue('password') === value) {
					return Promise.resolve()
				}
				return Promise.reject(new Error('Пароли не совпадают'))
			},
		}),
	],
	number: [
		{
			required: true,
			pattern: /^\d+$/,
			message: 'Не валидное значение',
		},
	],
	numberNotRequired: [
		{
			required: false,
			pattern: /^\d+$/,
			message: 'Не валидное значение',
		},
	],
	noNumber: [
		{
			required: true,
			pattern: /^([^0-9]*)$/,
			message: 'Не валидное значение',
		},
	],
	noNumberNotRequired: [
		{
			required: false,
			pattern: /^([^0-9]*)$/,
			message: 'Не валидное значение',
		},
	],
	required: [
		{
			required: true,
			message: 'Обязательное поле',
		},
	],
}