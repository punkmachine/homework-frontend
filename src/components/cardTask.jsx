import React from 'react';
import { Card, message, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { useEditHomeworkMutation, useDeleteHomeworkMutation } from '../api/homework';

function CardTask(props) {
	const { id, title, description, author, expireDate } = props;

	const [editTask] = useEditHomeworkMutation();
	const [delTask] = useDeleteHomeworkMutation();

	async function updateTask() {
		try {

		} catch (error) {
			console.log(error);
		}
	}

	async function deleteTask() {
		try {
			const { data } = await delTask(id);
			const { success, msg } = data;

			if (success) {
				message.success(msg);
			} else {
				message.error(msg);
			}
		} catch (error) {
			console.log(error);
		}
	}

	const nodeTitle = <div className='card-homework-title'>
		<span>{title}</span>
		<div className='card-homework-controller'>
			<EditOutlined className='card-homework-icon' onClick={updateTask} />
			<DeleteOutlined className='card-homework-icon' onClick={deleteTask} />
		</div>
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