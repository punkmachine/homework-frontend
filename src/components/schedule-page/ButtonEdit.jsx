import React from 'react';
import { Button } from 'antd';
import { SaveOutlined, EditOutlined } from '@ant-design/icons';

function ButtonEdit({ toggleEditSchedule, editSchedule }) {
	return (
		<Button
			type='primary'
			onClick={toggleEditSchedule}
			icon={editSchedule ? <SaveOutlined /> : <EditOutlined />}
			className='flex align-center'
		>
			{editSchedule ? 'Сохранить' : 'Редактировать'}
		</Button>
	);
}

export { ButtonEdit };