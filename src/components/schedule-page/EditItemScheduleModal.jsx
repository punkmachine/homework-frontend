import React, { useState } from 'react';
import { Modal, Form } from 'antd';

import { InputFormItem } from '../app/InputFormItem';
import { SelectFormItem } from '../app/SelectFormItem';

import { scheduleItemForm, scheduleItemFormOther } from '../../constants/form-list';

function EditItemScheduleModal(props) {
	const {
		visibleEdit,
		toggleVisibleEdit,
		editScheduleItem,
		formEdit,
		lessonList,
		editedItemSchedule,
		setEditedItemSchedule
	} = props;

	const [isOfflineLesson, setIsOfflineLesson] = useState(false);

	function closeModal() {
		toggleVisibleEdit(false);
		formEdit.resetFields();
		setEditedItemSchedule({});
	}

	return (
		<div className="add-item-schedule">
			<Modal
				visible={visibleEdit}
				okText='Cохранить'
				cancelText='Отмена'
				onCancel={closeModal}
				title='Редактирование элемента расписания'
				destroyOnClose
				onOk={editScheduleItem}
			>
				<Form
					form={formEdit}
					initialValues={editedItemSchedule}
				>
					{scheduleItemForm.map(item =>
						item.type === 'select'
							? (<SelectFormItem
								{...item}
								key={item.name}
								size="large"
								options={
									item.name === 'lesson_name'
										? [...lessonList.map(item => ({ label: item.name, value: item.id }))]
										: item.options
								}
								onSelect={
									item.name !== 'lesson'
										? (value) => setIsOfflineLesson(value === 1)
										: null
								}
							/>)
							: (<InputFormItem
								{...item}
								key={item.name}
								size="large"
							/>)
					)}
					{isOfflineLesson
						? scheduleItemFormOther.map(item =>
							<InputFormItem
								{...item}
								key={item.name}
								size="large"
							/>)
						: null
					}
				</Form>
			</Modal>
		</div>
	);
}

export { EditItemScheduleModal };