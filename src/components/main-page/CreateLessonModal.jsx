import React from 'react';
import { Modal, Form, Input } from 'antd';
import { rules } from '../../utils/rules';

function CreateLessonModal(props) {
	const { visible, cancelClick, createLesson, form } = props;

	return (
		<div className="create-lesson">
			<Modal
				visible={visible}
				okText='Создать'
				cancelText='Отмена'
				onCancel={cancelClick}
				title='Создание предмета'
				destroyOnClose
				onOk={createLesson}
			>
				<Form form={form}>
					<Form.Item
						name='name'
						rules={rules.noNumber}
					>
						<Input
							onPressEnter={createLesson}
							placeholder='Введение название' />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}

export { CreateLessonModal }