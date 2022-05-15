import React from 'react';
import { Tabs, Typography, Table } from 'antd';
import { MainTitle } from '../components/app/MainTitle';

function SchedulePage() {
	const columns = [
		{
			title: '№',
			key: 'number',
			dataIndex: 'number',
		},
		{
			title: 'Предмет',
			key: 'lesson',
			dataIndex: 'lesson',
		},
		{
			title: 'Время начала',
			key: 'dateStart',
			dataIndex: 'dateStart',
		},
		{
			title: 'Время окончания',
			key: 'dateEnd',
			dataIndex: 'dateEnd',
		},
		{
			title: 'Тип занятия',
			key: 'typeLesson',
			dataIndex: 'typeLesson',
		},
		{
			title: 'Zoom ID',
			key: 'zoomID',
			dataIndex: 'zoomID',
		},
		{
			title: 'Zoom pass',
			key: 'zoomPass',
			dataIndex: 'zoomPass',
		},
		{
			title: 'Аудитория',
			key: 'classroom',
			dataIndex: 'classroom',
		},
		{
			title: 'Преподаватель',
			key: 'teacher',
			dataIndex: 'teacher',
		},
	];

	const configTable = {
		columns,
		bordered: true
	}

	return (
		<div className="shedule-wrapper">
			<MainTitle text='Расписание' />
			<Tabs type="card">
				<Tabs.TabPane tab="Понедельник" key="Monday">
					<Table {...configTable} />
				</Tabs.TabPane>
				<Tabs.TabPane tab="Вторник" key="Tuesday">
					<Table {...configTable} />
				</Tabs.TabPane>
				<Tabs.TabPane tab="Среда" key="Wednesday">
					<Table {...configTable} />
				</Tabs.TabPane>
				<Tabs.TabPane tab="Четверг" key="Thursday">
					<Table {...configTable} />
				</Tabs.TabPane>
				<Tabs.TabPane tab="Пятница" key="Friday">
					<Table {...configTable} />
				</Tabs.TabPane>
			</Tabs>
		</div>
	);
}

export { SchedulePage };