import React from 'react';
// import moment from 'moment';
import { Card, message, Typography, Form, Modal, Input, DatePicker } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { useEditHomeworkMutation, useDeleteHomeworkMutation } from '../api/homework';
import { useModal } from '../hooks/modal';

import { rules } from '../utils/rules';

function CardTask(props) {
	const { id, title, description, author, expireDate } = props;

	// const dateFormat = 'DD-MM-YYYY';

	const [formUpdate] = Form.useForm();

	const [editTask] = useEditHomeworkMutation();
	const [delTask] = useDeleteHomeworkMutation();

	const [visibleUpdate, toggleVisibleUpdate] = useModal();

	function cancelUpdate() {
		toggleVisibleUpdate(false);
		formUpdate.resetFields();
	}

	function editTaskClick(event) {
		event.stopPropagation();
		toggleVisibleUpdate(true);
	}

	async function updateTask() {
		try {
			const formData = await formUpdate.validateFields();

			const { data } = await editTask({
				...formData,
				// expireDate: moment(formData.expireDate).format(dateFormat),
				id,
				title,
				author,
			});

			const { success, msg } = data;

			if (success) {
				message.success(msg);
			} else {
				message.error(msg);
			}

			formUpdate.resetFields();
			toggleVisibleUpdate(false);
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
			<EditOutlined className='card-homework-icon' onClick={editTaskClick} />
			<DeleteOutlined className='card-homework-icon' onClick={deleteTask} />
		</div>
	</div>

	return (
		<>
			<Card className='card-homework' title={nodeTitle} key={id}>
				<Typography>{description}</Typography>

				<div className="card-homework-footer">
					<Typography>{author}</Typography>
					<Typography>{expireDate}</Typography>
				</div>
			</Card>

			<div className="create-lesson">
				<Modal
					visible={visibleUpdate}
					okText='Сохранить'
					cancelText='Отмена'
					onCancel={cancelUpdate}
					title='Редактирование домашнего задания'
					destroyOnClose
					onOk={updateTask}
				>
					<Form form={formUpdate}>
						<Form.Item
							name='description'
							rules={rules.noNumber}
							initialValue={description}
						>
							<Input
								placeholder='Введение описание задания'
							/>
						</Form.Item>
						{/* <Form.Item
							name='expireDate'
							rules={rules.required}
							initialValue={moment(expireDate, dateFormat)}
						>
							<DatePicker
								format={dateFormat}
								className='w100'
								placeholder='Выберите дату истечения'
								showToday
								placement='bottomRight'
							/>
						</Form.Item> */}
					</Form>
				</Modal>
			</div>
		</>
	);
}

export { CardTask };