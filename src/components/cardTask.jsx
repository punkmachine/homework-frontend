import React from 'react';
import { Card, Typography } from 'antd';

function CardTask(props) {
	const { id, title, description, createTime, author, expireDate } = props;

	const nodeTitle = <div className='card-homework-title'>
		<span>{title}</span>
		<span>{createTime}</span>
	</div>

	return (
		<Card className='card-homework' title={nodeTitle} key={id}>
			<Typography>{description}</Typography>

			<div className="card-homework-footer">
				<Typography>{author}</Typography>
				<Typography>{expireDate}</Typography>
			</div>
		</Card>
	);
}

export { CardTask };