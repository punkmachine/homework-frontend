import { useHistory, useLocation } from 'react-router-dom';
import { LESSON_PAGE_PATH, SCHEDULE_PAGE_PATH } from '../constants/routes';

export const useRedirect = () => {
	const history = useHistory();
	const { pathname } = useLocation();

	const goback = () => history.goBack();
	const goSchedule = () => history.push(SCHEDULE_PAGE_PATH);
	const goMain = () => history.push('/');
	const goLesson = (id) => history.push(`${LESSON_PAGE_PATH}-${id}`);

	return {
		pathname,
		goback,
		goLesson,
		goMain,
		goSchedule,
	}
}