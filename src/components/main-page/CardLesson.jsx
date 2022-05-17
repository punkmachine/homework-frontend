import React from 'react';
import { Typography, Card } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useRedirect } from '../../hooks/redirect';

function CardLesson(props) {
	const { id, name, deleteLesson, hidden } = props;
	const { goLesson } = useRedirect();

	function deleteLessonClick(event) {
		event.stopPropagation();
		deleteLesson(id);
	}

	function editLessonClick(event) {
		event.stopPropagation();
	}

	return (
		<Card className='card-lesson' onClick={() => goLesson(id)}>
			<div className="card-lesson-controller" hidden={hidden}>
				<EditOutlined className='card-lesson-icon' onClick={editLessonClick} />
				<DeleteOutlined className='card-lesson-icon' onClick={deleteLessonClick} />
			</div>
			<Typography.Title
				level={5}
				className='card-lesson-title'
			>
				{name}
			</Typography.Title>
		</Card>
	);
}

export { CardLesson };