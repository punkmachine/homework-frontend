import * as routes from './routes';

export const headData = {
	[routes.MAIN_PAGE_PATH]: {
		title: 'Сервис по записи домашних заданий',
		description: 'Главная страница сервиса по записи домашних заданий'
	},
	[routes.LESSON_PAGE_PATH]: {
		title: 'Урок - ',
		description: 'Домашние задания по уроку - ',
	},
	[routes.SCHEDULE_PAGE_PATH]: {
		title: 'Расписание занятий',
		description: 'Расписание занятий',
	}
}