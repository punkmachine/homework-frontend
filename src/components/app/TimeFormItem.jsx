import React from 'react';
import { Form, TimePicker } from 'antd';

function TimeFormItem(props) {
	const {
		name,
		rules = {},
		placeholder = '',
		format = 'HH:mm:ss',
		size = 'large',
		className = '',
		allowClear = false,
	} = props;

	return (
		<Form.Item
			name={name}
			rules={rules}
		>
			<TimePicker
				placeholder={placeholder}
				format={format}
				size={size}
				allowClear={allowClear}
				className={className}
				showNow={false}
			/>
		</Form.Item>
	);
}

export { TimeFormItem };