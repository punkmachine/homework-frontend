import moment from 'moment';
import { dictionaryDay } from '../constants/dictionaty-day';

export function validateAddScheduleItem(data) {
	return {
		...data,
		'zoom_id': '-',
		'zoom_pass': '-',
		day: dictionaryDay.find(item => item.key === +sessionStorage.getItem('scheduleTab')).alias,
		lesson: data['lesson_name'],
		'time_start': moment(data['time_start']).format('HH:mm:ss'),
		'time_end': moment(data['time_end']).format('HH:mm:ss'),
	};
}

export function validateEditScheduleItem(data, item) {
	return {
		...item,
		...data,
		'time_start': moment(data['time_start']).format('HH:mm:ss'),
		'time_end': moment(data['time_end']).format('HH:mm:ss'),
	};
}