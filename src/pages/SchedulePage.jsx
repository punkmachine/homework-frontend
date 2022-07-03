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
import { useRedirect } from '../hooks/redirect';
import { useToggle } from '../hooks/toggle';
import { useModal } from '../hooks/modal';

import { MainTitle } from '../components/app/MainTitle';
import { Spinner } from '../components/app/Spinner';
import { ButtonEdit } from '../components/schedule-page/ButtonEdit';
import { FooterTable } from '../components/schedule-page/FooterTable';
import { AddItemScheduleModal } from '../components/schedule-page/AddItemScheduleModal';

import { scheduleTable } from '../constants/columns-settings';
import { dictionaryDay } from '../constants/dictionaty-day';

function SchedulePage() {
	const isAuth = useSelector((state) => state.authReducer.isAuth);
	const [formAdd] = Form.useForm();

	const newDate = new Date();

	const { data = {}, isLoading, error } = useGetScheduleQuery();
	const { data: dataLessons = {}, isLoadingLessons, errorLessons } = useGetLessonsListQuery();
	const { schedule = [] } = data;
	const { lessons = [] } = dataLessons;

	const [createScheduleItem] = useCreateScheduleItemMutation();
	const [deleteScheduleItem] = useDeleteScheduleItemMutation();
	const [updateScheduleItem] = useUpdateScheduleItemMutation();

	const { goLesson } = useRedirect();
	const [editSchedule, toggleEditSchedule] = useToggle(false);
	const [visibleAdd, toggleVisibleAdd] = useModal(false);

	const [scheduleData, setScheduleData] = useState([]);
	const [lessonList, setLessonList] = useState([]);

	async function addScheduleItem() {
		try {
			const dataForm = await formAdd.validateFields();

			const { data } = await createScheduleItem({
				'zoom_id': '-',
				'zoom_pass': '-',
				day: dictionaryDay.find(item => item.key === +sessionStorage.getItem('scheduleTab')).alias,
				...dataForm,
			});

			const { success } = data;

			if (success) {
				message.success('Предмет добавлен в расписание');
				toggleVisibleAdd();
				formAdd.resetFields();
			} else {
				message.error('Произошла ошибка при добавлении предмета в расписание');
			}
		} catch (error) {
			console.log(error);
		}
	}

	function getClearColumns(columns, day) {
		const removeZoomColumns = (columns) => columns.map(item => !item.key.includes('zoom') ? item : null).filter(item => !!item);

		if (!isAuth) {
			return removeZoomColumns(columns);
		} else {
			const lessonsDay = scheduleData[day] ?? [];
			const onlineLesson = lessonsDay.find(item => item['type_lesson'] === 1);

			if (!!onlineLesson) {
				return columns;
			} else {
				return removeZoomColumns(columns);
			}
		}
	}

	function getStatusLesson(timeStart, timeEnd, day) {
		const timeStartDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), timeStart.slice(0, 2), timeStart.slice(3, 5));
		const timeEndDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), timeEnd.slice(0, 2), timeEnd.slice(3, 5));

		if (newDate.getDay() !== dictionaryDay.find(item => item.alias === day)?.key) {
			return '';
		} else if (newDate - timeStartDate > 0 && newDate - timeEndDate > 0) {
			return 'ended';
		} else if (newDate - timeStartDate < 0 && newDate - timeEndDate < 0) {
			return 'next';
		} else {
			return 'current';
		}
	}

	const getRowClassName = (record) => `table-row table-row-${record.status}`;

	const scheduleMapping = (arr, day) => [
		...arr
			.filter(item => item.day === day)
			.map((item, index) => ({
				...item,
				number: index + 1,
				status: getStatusLesson(item['time_start'], item['time_end'], item.day)
			}))
	];

	const getDefaultActiveKey = () => !sessionStorage.getItem('scheduleTab')
		? `${newDate.getDay() > 5 || newDate.getDay() < 1 ? 1 : newDate.getDay()}`
		: sessionStorage.getItem('scheduleTab');

	const onClickTab = (key) => sessionStorage.setItem('scheduleTab', key);

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
				tabBarExtraContent={<ButtonEdit hidden={!isAuth} editSchedule={editSchedule} toggleEditSchedule={toggleEditSchedule} />}
			>
				{dictionaryDay.map(day =>
					<Tabs.TabPane
						tab={day.name}
						key={`${day.key}`}
					>
						<Table
							dataSource={scheduleData[day.alias]}
							columns={getClearColumns(scheduleTable, day.alias)}
							onRow={(record) => {
								return {
									onClick: () => {
										const lesson = lessonList.find(item => item.name === record['lesson_name']);
										goLesson(lesson.id);
									}
								}
							}}
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
		</div>
	);
}

export { SchedulePage };