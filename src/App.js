import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useLocation } from 'react-router-dom';

import { MainPage } from './pages/MainPage';
import { LessonPage } from './pages/LessonPage';
import { SchedulePage } from './pages/SchedulePage';
import { Login } from './pages/LoginPage';
import { Registration } from './pages/RegistrationPage';
import { ExamsPage } from './pages/ExamsPage';
import { ProfilePage } from './pages/ProfilePage';

import { Header } from './components/app/Header';

import {
	LESSON_PAGE_PATH, SCHEDULE_PAGE_PATH, LOGIN_PAGE_PATH, REGISTRATION_PAGE_PATH, EXAMS_PAGE_PATH, PROFILE_PAGE_PATH
} from './constants/routes';
import { headData } from './constants/helmet';

function App() {
	const { pathname } = useLocation();

	return (
		<div className='App'>
			<Helmet>
				<title>{headData[pathname]?.title ?? ''}</title>
				<meta name='description' content={`${headData[pathname]?.description ?? ''}`} />
			</Helmet>

			<Header />
			<main className="content">
				<Switch>
					<Route exact path='/' component={MainPage} />
					<Route path={LOGIN_PAGE_PATH} component={Login} />
					<Route path={REGISTRATION_PAGE_PATH} component={Registration} />
					<Route path={SCHEDULE_PAGE_PATH} component={SchedulePage} />
					<Route path={EXAMS_PAGE_PATH} component={ExamsPage} />
					<Route path={PROFILE_PAGE_PATH} component={ProfilePage} />
					<Route path={`${LESSON_PAGE_PATH}-:id`} component={LessonPage} />
				</Switch>
			</main>
		</div>
	);
}

export default App;
