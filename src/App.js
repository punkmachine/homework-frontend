import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";

import { MainPage } from './pages/main';
import { LessonPage } from './pages/lesson';
import { SchedulePage } from './pages/schedule';

import { usePathname } from './hooks/pathname';

import { Header } from './components/header';

import { LESSON_PAGE_PATH, SCHEDULE_PAGE_PATH } from './constants/routes';
import { headData } from './constants/helmet';

function App() {
	const { clearPath } = usePathname();

	return (
		<div className='App'>
			<Helmet>
				<title>{headData[clearPath].title ?? ''}</title>
				<meta name='description' content={`${headData[clearPath].description ?? ''}`} />
			</Helmet>

			<Header />
			<main className="content">
				<Switch>
					<Route exact path='/' component={MainPage} />
					<Route path={`${LESSON_PAGE_PATH}-:id`} component={LessonPage} />
					<Route path={SCHEDULE_PAGE_PATH} component={SchedulePage} />
				</Switch>
			</main>
		</div>
	);
}

export default App;
