import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Tabs, Table, message } from 'antd';

import { useGetScheduleQuery } from '../api/schedule';
import { useGetLessonsListQuery } from '../api/lessons';
import { useRedirect } from '../hooks/redirect';

import { MainTitle } from '../components/app/MainTitle';
import { Spinner } from '../components/app/Spinner';

import { scheduleTable } from '../constants/columns-settings';

// TODO: добавить режим редактирования таблицы.
// TODO: добавить drag-n-drop в режим редактирования таблицы.

const dictionaryDay = [
	{
		key: 1,
		name: 'Понедельник',
		alias: 'mon',
	},
	{
		key: 2,
		name: 'Вторник',
		alias: 'tue',
	},
	{
		key: 3,
		name: 'Среда',
		alias: 'wed',
	},
	{
		key: 4,
		name: 'Четверг',
		alias: 'thu',
	},
	{
		key: 5,
		name: 'Пятница',
		alias: 'fri',
	},
];

function SchedulePage() {
	const isAuth = useSelector((state) => state.authReducer.isAuth);
	const newDate = new Date();

	const { data = {}, isLoading, error } = useGetScheduleQuery();
	const { schedule = [] } = data;
	const { data: dataLessons = {}, isLoadingLessons, errorLessons } = useGetLessonsListQuery();
	const { lessons = [] } = dataLessons;

	const { goLesson } = useRedirect();

	const [scheduleData, setScheduleData] = useState([]);
	const [lessonList, setLessonList] = useState([]);

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
			.map((item, index) => ({ ...item, number: index + 1, status: getStatusLesson(item['time_start'], item['time_end'], item.day) }))
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
						/>
					</Tabs.TabPane>
				)}
			</Tabs>
		</div>
	);
}

export { SchedulePage };