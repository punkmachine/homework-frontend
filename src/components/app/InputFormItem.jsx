import React from 'react';
import { Form, Input } from 'antd';
import Icon from '@ant-design/icons';

function InputFormItem(props) {
	const { name, rules, placeholder, size, className, type, icon } = props;

	const config = {
		placeholder,
		size,
	};

	return (
		<Form.Item
			name={name}
			className={className}
			rules={rules}
		>
			{type === 'input' ?
				<Input
					{...config}
					prefix={<Icon component={icon} />}
				/>
				: type === 'password' ?
					<Input.Password
						{...config}
						prefix={<Icon component={icon} />}
					/>
					: null
			}

		</Form.Item>
	);
}

export { InputFormItem };