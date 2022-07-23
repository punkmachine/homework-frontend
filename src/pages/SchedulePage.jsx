import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Tabs, Table, message, Form } from 'antd';

import {
	useGetScheduleQuery,
	useCreateScheduleItemMutation,
	useDeleteScheduleItemMutation,
	useUpdateScheduleItemMutation
} from '../api/schedule';
import { useGetLessonsListQuery } from '../api/lessons';
import { useToggle } from '../hooks/toggle';
import { useModal } from '../hooks/modal';

import { MainTitle } from '../components/app/MainTitle';
import { Spinner } from '../components/app/Spinner';
import { ButtonEdit } from '../components/schedule-page/ButtonEdit';
import { FooterTable } from '../components/schedule-page/FooterTable';
import { AddItemScheduleModal } from '../components/schedule-page/AddItemScheduleModal';
import { EditItemScheduleModal } from '../components/schedule-page/EditItemScheduleModal';
import { TableScheduleAction } from '../components/schedule-page/TableScheduleAction';

import { validateAddScheduleItem, validateEditScheduleItem } from '../utils/validators';
import { getDefaultActiveKey, onClickTab, scheduleMapping, getRowClassName } from '../utils/schedule';

import { scheduleTable } from '../constants/columns-settings';
import { dictionaryDay } from '../constants/dictionaty-day';

function SchedulePage() {
	const isAuth = useSelector((state) => state.authReducer.isAuth);
	const [formAdd] = Form.useForm();
	const [formEdit] = Form.useForm();

	const { data = {}, isLoading, error } = useGetScheduleQuery();
	const { data: dataLessons = {}, isLoadingLessons, errorLessons } = useGetLessonsListQuery();
	const { schedule = [] } = data;
	const { lessons = [] } = dataLessons;

	const [createScheduleItem] = useCreateScheduleItemMutation();
	const [deleteScheduleItem] = useDeleteScheduleItemMutation();
	const [updateScheduleItem] = useUpdateScheduleItemMutation();

	const [editSchedule, toggleEditSchedule] = useToggle(false);
	const [visibleAdd, toggleVisibleAdd] = useModal(false);
	const [visibleEdit, toggleVisibleEdit] = useModal(false);

	const [scheduleData, setScheduleData] = useState([]);
	const [lessonList, setLessonList] = useState([]);
	const [editedItemSchedule, setEditedItemSchedule] = useState({});

	async function addScheduleItem() {
		try {
			const dataForm = await formAdd.validateFields();
			const record = validateAddScheduleItem(dataForm)
			delete record['lesson_name'];

			const { data } = await createScheduleItem(record);
			const { success } = data;

			if (success) {
				message.success('Предмет добавлен в расписание');
				toggleVisibleAdd(false);
				formAdd.resetFields();
			} else {
				message.error('Произошла ошибка при добавлении предмета в расписание');
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function editScheduleItem() {
		try {
			const dataForm = await formEdit.validateFields();
			const record = validateEditScheduleItem(dataForm, editedItemSchedule);
			const { data } = await updateScheduleItem(record);
			const { success } = data;

			if (success) {
				message.success('Предмет отредактирован');
				toggleVisibleEdit(false);
				formEdit.resetFields();
			} else {
				message.error('Произошла ошибка при редактировании предмета');
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function removeScheduleItem(id, event) {
		event.stopPropagation();
		try {
			const { data } = await deleteScheduleItem(id);

			const { success } = data;

			if (success) {
				message.success('Предмет успешно удален');
			} else {
				message.error('Произошла ошибка при удалении предмета из расписания');
			}
		} catch (error) {
			console.log(error);
		}
	}

	function editClick(item, event) {
		event.stopPropagation();
		toggleVisibleEdit(true);
		setEditedItemSchedule({
			...item,
			'lesson_name': [...lessonList.map(item => ({ label: item.name, value: item.id }))].find(lesson => lesson.label === item['lesson_name'].name).value,
		});
	}

	function addActionsToTable(content = []) {
		let newContent = [
			...content.map(item => {
				return {
					...item,
					'lesson_name': {
						name: item['lesson_name'],
						id: item.id
					}
				}
			})
		];

		if (!editSchedule) {
			return newContent;
		} else {
			return [
				...newContent.map(item => {
					return {
						...item,
						actions: <TableScheduleAction
							deleteClick={(event) => removeScheduleItem(item.id, event)}
							editClick={(event) => editClick(item, event)}
						/>
					}
				})
			];
		}
	}

	function getClearColumns(columns, day) {
		let newColumns = [...columns];

		const removeZoomColumns = (columns) => columns.map(item => !item.key.includes('zoom') ? item : null).filter(item => !!item);

		if (!isAuth) {
			newColumns = removeZoomColumns(columns);
		} else {
			const lessonsDay = scheduleData[day] ?? [];
			const onlineLesson = lessonsDay.find(item => item['type_lesson'] === 1);

			if (onlineLesson) {
				newColumns = removeZoomColumns(columns);
			}
		}

		if (!editSchedule) {
			newColumns = newColumns.filter(item => item.dataIndex !== 'actions');
		}

		return newColumns;
	}

	useEffect(() => {
		if (schedule.length > 0) {
			const newArray = [...schedule.map(item => ({ ...item, key: item.id }))];

			setScheduleData({
				mon: scheduleMapping(newArray, 'mon'),
				tue: scheduleMapping(newArray, 'tue'),
				wed: scheduleMapping(newArray, 'wed'),
				thu: scheduleMapping(newArray, 'thu'),
				fri: scheduleMapping(newArray, 'fri'),
			});
		};
	}, [schedule]);

	useEffect(() => {
		if (lessons.length > 0) setLessonList([...lessons]);
	}, [lessons]);

	if (isLoading || isLoadingLessons) {
		return <Spinner />
	}

	if (error) message.error(error);
	if (errorLessons) message.error(error);

	return (
		<div className="shedule-wrapper">
			<MainTitle text='Расписание' />

			<Tabs
				type="card"
				defaultActiveKey={() => getDefaultActiveKey()}
				onChange={onClickTab}
				tabBarExtraContent={
					<ButtonEdit
						hidden={!isAuth}
						editSchedule={editSchedule}
						toggleEditSchedule={toggleEditSchedule}
					/>
				}
			>
				{dictionaryDay.map(day =>
					<Tabs.TabPane
						tab={day.name}
						key={`${day.key}`}
					>
						<Table
							dataSource={addActionsToTable(scheduleData[day.alias])}
							columns={getClearColumns(scheduleTable, day.alias)}
							rowClassName={getRowClassName}
							pagination={false}
							bordered
							footer={() => <FooterTable hidden={!editSchedule} click={toggleVisibleAdd} />}
						/>
					</Tabs.TabPane>
				)}
			</Tabs>

			<AddItemScheduleModal
				visibleAdd={visibleAdd}
				toggleVisibleAdd={toggleVisibleAdd}
				addScheduleItem={addScheduleItem}
				formAdd={formAdd}
				lessonList={lessonList}
			/>

			<EditItemScheduleModal
				visibleEdit={visibleEdit}
				toggleVisibleEdit={toggleVisibleEdit}
				editScheduleItem={editScheduleItem}
				formEdit={formEdit}
				lessonList={lessonList}
				editedItemSchedule={editedItemSchedule}
				setEditedItemSchedule={setEditedItemSchedule}
			/>
		</div>
	);
}

export { SchedulePage };