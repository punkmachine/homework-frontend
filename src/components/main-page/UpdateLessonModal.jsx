import React from 'react';
import { Modal, Form, Input } from 'antd';
import { rules } from '../../utils/rules';

function UpdateLessonModal(props) {
	const { visible, cancelClick, updateLesson, form, lessonEditing } = props;

	return (
		<div className="create-lesson">
			<Modal
				visible={visible}
				okText='Сохранить'
				cancelText='Отмена'
				onCancel={cancelClick}
				title='Редактирование предмета'
				destroyOnClose
				onOk={updateLesson}
			>
				<Form form={form}>
					<Form.Item
						name='name'
						rules={rules.noNumber}
						initialValue={lessonEditing}
					>
						<Input
							onPressEnter={updateLesson}
							placeholder='Введение название'
						/>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}

export { UpdateLessonModal }