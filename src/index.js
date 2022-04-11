import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom';

import locale from 'antd/lib/locale/ru_RU';

import { store } from './redux/store';

import App from './App';

import 'antd/dist/antd.css';
import './assets/main.scss'

ReactDOM.render(
	<Provider store={store}>
		<ConfigProvider locale={locale}>
			<Router>
				<App />
			</Router>
		</ConfigProvider>
	</Provider>,
	document.getElementById('root')
);