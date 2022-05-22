import React from 'react';
import { Table } from 'antd';
import { MainTitle } from '../components/app/MainTitle';

function ExamsPage() {
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
			title: 'Преподаватель',
			key: 'teacher',
			dataIndex: 'teacher',
		},
		{
			title: 'Дата проведения',
			key: 'dateStart',
			dataIndex: 'dateStart',
		},
		{
			title: 'Форма приема',
			key: 'typeExam',
			dataIndex: 'typeExam',
		},
		{
			title: 'Время проведения',
			key: 'timeStart',
			dataIndex: 'timeStart',
		},
		{
			title: 'Аудитория',
			key: 'classroom',
			dataIndex: 'classroom',
		},
	];

	return (
		<div className='exams-wrapper'>
			<MainTitle text='Расписание экзаменов' />

			<Table
				bordered
				columns={columns}
			/>
		</div>
	);
}

export { ExamsPage };