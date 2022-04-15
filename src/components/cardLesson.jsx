import React from 'react';
import { Typography, Card } from 'antd';
import { useRedirect } from '../hooks/redirect';

function CardLesson(props) {
	const { id, label: title } = props;
	const { goLesson } = useRedirect();

	return (
		<Card onClick={() => goLesson(id)} className='card-lesson'>
			<Typography.Title level={5}>{title}</Typography.Title>
		</Card>
	);
}

export { CardLesson };