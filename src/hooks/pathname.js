import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as routes from '../constants/routes';

export const usePathname = () => {
	const { pathname } = useLocation();
	const [clearPath, setClearPath] = useState('');

	const dictionary = {
		[routes.MAIN_PAGE_PATH]: routes.MAIN_PAGE_PATH,
		[routes.SCHEDULE_PAGE_PATH]: routes.SCHEDULE_PAGE_PATH,
	}

	useEffect(() => {
		if (dictionary[pathname]) {
			setClearPath(pathname);
		} else if (pathname.indexOf(routes.LESSON_PAGE_PATH) > -1) {
			setClearPath(routes.LESSON_PAGE_PATH);
		} else {
			setClearPath('');
		}
	}, [pathname]);

	return {
		pathname,
		clearPath
	}
}