import React from 'react';
import { Typography, Card, Form, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { useUpdateLessonMutation } from '../../api/lessons';
import { useRedirect } from '../../hooks/redirect';
import { useModal } from '../../hooks/modal';

import { UpdateLessonModal } from './UpdateLessonModal';

// TODO: отобразить count на карточке
function CardLesson(props) {
	const { id, name, deleteLesson, hidden, count } = props;

	const [formUpdate] = Form.useForm();

	const { goLesson } = useRedirect();
	const [visibleUpdate, toggleVisibleUpdate] = useModal();

	const [update] = useUpdateLessonMutation();

	function cancelUpdate() {
		toggleVisibleUpdate(false);
		formUpdate.resetFields();
	}

	function deleteLessonClick(event) {
		event.stopPropagation();
		deleteLesson(id);
	}

	function editLessonClick(event) {
		event.stopPropagation();
		toggleVisibleUpdate(true);
	}

	async function updateLesson() {
		try {
			const formData = await formUpdate.validateFields();

			const { data } = await update({
				...formData,
				id,
				count
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

	return (<>
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
		<UpdateLessonModal
			visible={visibleUpdate}
			cancelClick={cancelUpdate}
			updateLesson={updateLesson}
			form={formUpdate}
			lessonEditing={name}
		/>
	</>);
}

export { CardLesson };