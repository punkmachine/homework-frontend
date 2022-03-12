import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { MainPage } from './pages/main';
import { LessonPage } from './pages/lesson';
import { SchedulePage } from './pages/schedule';

import { Header } from './components/header';

import { LESSON_PAGE_PATH, SCHEDULE_PAGE_PATH } from './constants/routes';

function App() {
	return (
		<div className='App'>
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
