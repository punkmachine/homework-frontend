import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useLocation } from 'react-router-dom';

import { MainPage } from './pages/main';
import { LessonPage } from './pages/lesson';
import { SchedulePage } from './pages/schedule';
import { Login } from './pages/login';
import { Registration } from './pages/registration';

import { Header } from './components/app/header';

import { LESSON_PAGE_PATH, SCHEDULE_PAGE_PATH, LOGIN_PAGE_PATH, REGISTRATION_PAGE_PATH } from './constants/routes';
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
					<Route path={`${LESSON_PAGE_PATH}-:id`} component={LessonPage} />
					<Route path={SCHEDULE_PAGE_PATH} component={SchedulePage} />
				</Switch>
			</main>
		</div>
	);
}

export default App;
