import React from 'react';
import { Form, Select } from 'antd';

function SelectFormItem(props) {
	const {
		name,
		rules,
		placeholder,
		size,
		className,
		allowClear = false,
		options = [],
		onSelect,
	} = props;

	const config = {
		placeholder,
		size,
		allowClear,
		options,
		onSelect
	};

	return (
		<Form.Item
			name={name}
			className={className}
			rules={rules}
		>
			<Select {...config} />
		</Form.Item>
	);
}

export { SelectFormItem };