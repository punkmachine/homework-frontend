import { Tag } from 'antd';

export const scheduleTable = [
	{
		title: '№',
		key: 'number',
		dataIndex: 'number',
	},
	{
		title: 'Предмет',
		key: 'lesson',
		dataIndex: 'lesson_name',
	},
	{
		title: 'Время начала',
		key: 'dateStart',
		dataIndex: 'time_start',
	},
	{
		title: 'Время окончания',
		key: 'dateEnd',
		dataIndex: 'time_end',
	},
	{
		title: 'Тип занятия',
		key: 'typeLesson',
		dataIndex: 'type_lesson',
		render: (data) => data === 0 ? <Tag color='green'>{'offline'}</Tag> : <Tag color='blue'>{'online'}</Tag>
	},
	{
		title: 'Zoom ID',
		key: 'zoomID',
		dataIndex: 'zoom_id',
	},
	{
		title: 'Zoom pass',
		key: 'zoomPass',
		dataIndex: 'zoom_pass',
	},
	{
		title: 'Аудитория',
		key: 'classroom',
		dataIndex: 'classroom',
		align: 'center',
	},
	{
		title: 'Преподаватель',
		key: 'teacher',
		dataIndex: 'teacher',
	},
];