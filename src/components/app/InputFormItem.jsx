import React from 'react';
import { Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function InputFormItem(props) {
	const { name, rules, placeholder, size, className, type } = props;

	return (
		<Form.Item
			name={name}
			className={className}
			rules={rules}
		>
			{type === 'input' ?
				<Input
					placeholder={placeholder}
					size={size}
					prefix={<UserOutlined />}
				/>
				: type === 'password' ?
					<Input.Password
						placeholder={placeholder}
						size={size}
						prefix={<UserOutlined />}
					/>
					: null
			}

		</Form.Item>
	);
}

export { InputFormItem };