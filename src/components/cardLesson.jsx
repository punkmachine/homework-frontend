import React from 'react';
import { Typography } from 'antd';

function CardLesson(props) {
	const { id, title } = props;

	return (
		<div className="card-lesson-wrapper">
			<Typography.Title level={5}>{title}</Typography.Title>
		</div>
	);
}

export { CardLesson };