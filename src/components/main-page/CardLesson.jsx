import React from 'react';
import { Typography, Card } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useRedirect } from '../../hooks/redirect';

function CardLesson(props) {
	const { id, name, deleteLesson, hidden } = props;
	const { goLesson } = useRedirect();

	return (
		<Card className='card-lesson'>
			<div className="card-lesson-controller" hidden={hidden}>
				<EditOutlined className='card-lesson-icon' />
				<DeleteOutlined className='card-lesson-icon' onClick={() => deleteLesson(id)} />
			</div>
			<Typography.Title
				level={5}
				className='card-lesson-title'
				onClick={() => goLesson(id)}
			>
				{name}
			</Typography.Title>
		</Card>
	);
}

export { CardLesson };