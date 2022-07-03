import React, { useState } from 'react';
import { Modal, Form } from 'antd';

import { InputFormItem } from '../app/InputFormItem';
import { SelectFormItem } from '../app/SelectFormItem';

import { addScheduleItemForm, addScheduleItemFormOther } from '../../constants/form-list';

function AddItemScheduleModal(props) {
	const {
		visibleAdd,
		toggleVisibleAdd,
		addScheduleItem,
		formAdd,
		lessonList,
	} = props;

	const [isOfflineLesson, setIsOfflineLesson] = useState(false);

	return (
		<div className="add-item-schedule">
			<Modal
				visible={visibleAdd}
				okText='Создать'
				cancelText='Отмена'
				onCancel={() => toggleVisibleAdd(false)}
				title='Создание элемент расписания'
				destroyOnClose
				onOk={addScheduleItem}
			>
				<Form form={formAdd}>
					{addScheduleItemForm.map(item =>
						item.type === 'select'
							? (<SelectFormItem
								{...item}
								key={item.name}
								size="large"
								options={
									item.name === 'lesson'
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
						? addScheduleItemFormOther.map(item =>
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

export { AddItemScheduleModal };