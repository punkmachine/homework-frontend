import React from 'react';
import { Form, Input } from 'antd';
import Icon from '@ant-design/icons';

function InputFormItem(props) {
	const { name, rules, placeholder, size, className, type, icon = null } = props;

	let config = {
		placeholder,
		size,
	};

	if (icon) {
		config = {
			...config,
			prefix: <Icon component={icon} />
		}
	}

	return (
		<Form.Item
			name={name}
			className={className}
			rules={rules}
		>
			{type === 'input' ?
				<Input
					{...config}
				/>
				: type === 'password' ?
					<Input.Password
						{...config}
					/>
					: null
			}

		</Form.Item>
	);
}

export { InputFormItem };