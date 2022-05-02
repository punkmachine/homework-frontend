import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Select, AutoComplete, message, Button } from 'antd';
import { useSelector } from 'react-redux';

import { useGetLessonsListQuery } from '../api/lessons';

import { CardLesson } from '../components/cardLesson';
import { Spinner } from '../components/spinner';

function MainPage() {
	const isAuth = useSelector((state) => state.authReducer.isAuth);

	const { data = [], isLoading, error } = useGetLessonsListQuery();
	const { lessons = [] } = data;

	const [stateSpan, setStateSpan] = useState(6);
	const [options, setOptions] = useState([]);

	const onSearch = (searchText) => {
		setOptions([
			...lessons
				.filter(item => item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
				.map(item => ({ label: item.name, value: item.name }))
		]);
	};

	useEffect(() => {
		const screenWidth = window.screen.width;

		if (screenWidth <= 1024 && screenWidth > 768) {
			setStateSpan(8);
		} else if (screenWidth <= 768 && screenWidth > 425) {
			setStateSpan(12);
		} else if (screenWidth <= 425) setStateSpan(24);
	}, []);

	useEffect(() => {
		setOptions([
			...lessons.map(item => ({ label: item.name, value: item.name }))
		]);
	}, [isLoading])

	if (isLoading) {
		return <Spinner />
	}

	if (error) {
		message.error(error);
	}

	return (
		<div className='cardlist'>
			<Typography.Title level={1} style={{ textAlign: 'center', margin: '15px 0' }}>Предметный лист</Typography.Title>

			<div className='cardlist-controller'>
				<div>
					<Button
						type='primary'
						// onClick={}
						disabled={!isAuth}
						hidden={!isAuth}
					>
						Добавить
					</Button>
				</div>
				<div className='cardlist-controller-filter'>
					<AutoComplete
						options={options}
						className='filter-item'
						placeholder='Поиск...'
						onSearch={onSearch}
						allowClear
					/>
					<Select
						placeholder='Семестр'
						className='filter-item'
					// options={ }
					/>
				</div>
			</div>


			<div className="cards">
				<Row gutter={[20, 20]} justify='center'>
					{options.map((item, index) =>
						<Col span={stateSpan} key={index}>
							<CardLesson {...item} />
						</Col>
					)}
				</Row>
			</div>
		</div>
	);
}

export { MainPage };