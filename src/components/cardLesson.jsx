import React from 'react';
import { Typography } from 'antd';
import { useRedirect } from '../hooks/redirect';

function CardLesson(props) {
	const { id, title } = props;
	const { goLesson } = useRedirect();

	return (
		<div className="card-lesson-wrapper" onClick={() => goLesson(id)}>
			<Typography.Title level={5}>{title}</Typography.Title>
		</div>
	);
}

export { CardLesson };