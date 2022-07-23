import { dictionaryDay } from '../constants/dictionaty-day';

const newDate = new Date();

export function getStatusLesson(timeStart, timeEnd, day) {
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

export function getDefaultActiveKey() {
	return !sessionStorage.getItem('scheduleTab')
		? `${newDate.getDay() > 5 || newDate.getDay() < 1 ? 1 : newDate.getDay()}`
		: sessionStorage.getItem('scheduleTab');
}

export function onClickTab(key) {
	sessionStorage.setItem('scheduleTab', key);
}

export function scheduleMapping(arr, day) {
	return [
		...arr
			.filter(item => item.day === day)
			.map((item, index) => ({
				...item,
				number: index + 1,
				status: getStatusLesson(item['time_start'], item['time_end'], item.day)
			}))
	];
}

export function getRowClassName(record) {
	return `table-row table-row-${record.status}`;
}