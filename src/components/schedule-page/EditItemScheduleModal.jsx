import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Modal, Form } from 'antd';

import { InputFormItem } from '../app/InputFormItem';
import { SelectFormItem } from '../app/SelectFormItem';
import { TimeFormItem } from '../app/TimeFormItem';

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

	useEffect(() => {
		if (Object.keys(editedItemSchedule).length > 0) {
			formEdit.setFieldsValue({
				...editedItemSchedule,
				'time_start': moment(editedItemSchedule['time_start'], 'HH:mm:ss'),
				'time_end': moment(editedItemSchedule['time_end'], 'HH:mm:ss'),
			});
		}
	}, [editedItemSchedule]);

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
				<Form form={formEdit}>
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
							: item.type === 'time'
								? (<TimeFormItem
									{...item}
									key={item.name}
									format='HH:mm:ss'
									size='large'
									allowClear={false}
									className='w100'
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