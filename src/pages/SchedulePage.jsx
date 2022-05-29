import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Tabs, Table, message } from 'antd';

import {
	useGetScheduleQuery
} from '../api/schedule';

import { MainTitle } from '../components/app/MainTitle';
import { Spinner } from '../components/app/Spinner';

import { scheduleTable } from '../constants/columns-settings';

// TODO: добавить режим редактирования таблицы.
// TODO: добавить drag-n-drop в режим редактирования таблицы.
// TODO: добавить ссылку на тз к этому предмету и отметку, есть ли они на ближайшую дату.
// TODO: добавить объединение строк в одной колонке, если они одинаковые (https://ant.design/components/table/?theme=dark#components-table-demo-colspan-rowspan)
// TODO: добавить динамическое подсвечивание пар, если они сейчас идут, скоро будут или уже прошли.

function SchedulePage() {
	const isAuth = useSelector((state) => state.authReducer.isAuth);

	const { data = {}, isLoading, error } = useGetScheduleQuery();
	const { schedule = [] } = data;

	const [scheduleData, setScheduleData] = useState([]);

	function getClearColumns(columns) {
		if (!isAuth) {
			return columns.map(item => !item.key.includes('zoom') ? item : null).filter(item => !!item);
		} else {
			// TODO: придумать не костыль, для проверки на то, являются ли все данные из этого дня не онлайн

			return columns;
		}
	}

	const scheduleMapping = (arr, day) => [...arr.filter(item => item.day === day).map((item, index) => ({ ...item, number: index + 1 }))]

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

	if (isLoading) {
		return <Spinner />
	}

	if (error) message.error(error);

	return (
		<div className="shedule-wrapper">
			<MainTitle text='Расписание' />
			<Tabs type="card">
				<Tabs.TabPane tab="Понедельник" key="Monday">
					<Table
						dataSource={scheduleData.mon}
						columns={getClearColumns(scheduleTable)}
						pagination={false}
						bordered
					/>
				</Tabs.TabPane>
				<Tabs.TabPane tab="Вторник" key="Tuesday">
					<Table
						dataSource={scheduleData.tue}
						columns={getClearColumns(scheduleTable)}
						pagination={false}
						bordered
					/>
				</Tabs.TabPane>
				<Tabs.TabPane tab="Среда" key="Wednesday">
					<Table
						dataSource={scheduleData.wed}
						columns={getClearColumns(scheduleTable)}
						pagination={false}
						bordered
					/>
				</Tabs.TabPane>
				<Tabs.TabPane tab="Четверг" key="Thursday">
					<Table
						dataSource={scheduleData.thu}
						columns={getClearColumns(scheduleTable)}
						pagination={false}
						bordered
					/>
				</Tabs.TabPane>
				<Tabs.TabPane tab="Пятница" key="Friday">
					<Table
						dataSource={scheduleData.fri}
						columns={getClearColumns(scheduleTable)}
						pagination={false}
						bordered
					/>
				</Tabs.TabPane>
			</Tabs>
		</div>
	);
}

export { SchedulePage };