import React from 'react';
import { Button } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';

function ButtonEdit({ toggleEditSchedule, editSchedule }) {
	return (
		<Button
			type={editSchedule ? 'default' : 'primary'}
			onClick={toggleEditSchedule}
			icon={editSchedule ? <CloseOutlined /> : <EditOutlined />}
			className='flex align-center'
		>
			{editSchedule ? 'Отмена' : 'Редактировать'}
		</Button>
	);
}

export { ButtonEdit };