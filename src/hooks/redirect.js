import { useHistory, useLocation } from 'react-router-dom';
import { LESSON_PAGE_PATH, SCHEDULE_PAGE_PATH, LOGIN_PAGE_PATH, REGISTRATION_PAGE_PATH, PROFILE_PAGE_PATH } from '../constants/routes';

export const useRedirect = () => {
	const history = useHistory();
	const { pathname } = useLocation();

	const goback = () => history.goBack();

	const goLogin = () => history.push(LOGIN_PAGE_PATH);
	const goReg = () => history.push(REGISTRATION_PAGE_PATH);

	const goSchedule = () => history.push(SCHEDULE_PAGE_PATH);
	const goMain = () => history.push('/');
	const goProfile = () => history.push(PROFILE_PAGE_PATH);

	const goLesson = (id) => history.push(`${LESSON_PAGE_PATH}-${id}`);

	return {
		pathname,
		goLogin,
		goReg,
		goback,
		goLesson,
		goMain,
		goSchedule,
		goProfile
	}
}