import React from 'react';
import { Typography, Card } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useRedirect } from '../hooks/redirect';

function CardLesson(props) {
	const { value: id, label: title } = props;
	const { goLesson } = useRedirect();

	return (
		<Card className='card-lesson'>
			<div className="card-lesson-controller">
				<EditOutlined className='card-lesson-icon' />
				<DeleteOutlined className='card-lesson-icon' />
			</div>
			<Typography.Title
				level={5}
				className='card-lesson-title'
				onClick={() => goLesson(id)}
			>
				{title}
			</Typography.Title>
		</Card>
	);
}

export { CardLesson };