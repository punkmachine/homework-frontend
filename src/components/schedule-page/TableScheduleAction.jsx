import React from 'react';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

function TableScheduleAction(props) {
	const { editClick, deleteClick } = props;

	return (
		<div className='flex align-center gap10'>
			<Button
				type="primary"
				icon={<EditOutlined />}
				onClick={editClick}
			/>
			<Button
				type="primary"
				icon={<DeleteOutlined />}
				onClick={deleteClick}
			/>
		</div>
	);
}

export { TableScheduleAction };