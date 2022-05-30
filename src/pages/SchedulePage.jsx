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
// TODO: добавить объединение строк в одной колонке, если они одинаковые (https://ant.design/components/table/?theme=dark#components-table-demo-colspan-rowspan)
// TODO: добавить динамическое подсвечивание пар, если они сейчас идут, скоро будут или уже прошли.
// ! TODO: добавить выделение таба, который соответсвует сегоднешнему дню.

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

	function getClearColumns(columns) {
		if (!isAuth) {
			return columns.map(item => !item.key.includes('zoom') ? item : null).filter(item => !!item);
		} else {
			// TODO: придумать не костыль, для проверки на то, являются ли все данные из этого дня не онлайн

			return columns;
		}
	}

	const scheduleMapping = (arr, day) => [...arr.filter(item => item.day === day).map((item, index) => ({ ...item, number: index + 1 }))];
	const getDefaultActiveKey = () => !sessionStorage.getItem('scheduleTab')
		? `${newDate.getDay() > 5 || newDate.getDay() < 1 ? 1 : newDate.getDay()}`
		: sessionStorage.getItem('scheduleTab');;
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
							columns={getClearColumns(scheduleTable)}
							onRow={(record) => {
								return {
									onClick: () => {
										const lesson = lessonList.find(item => item.name === record['lesson_name']);
										goLesson(lesson.id);
									}
								}
							}}
							rowClassName='table-row'
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