import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Select, AutoComplete } from 'antd';
import { CardLesson } from '../components/cardLesson';

function MainPage() {
	const [stateSpan, setStateSpan] = useState(6);
	const [options, setOptions] = useState([]);

	const array = [
		{
			title: 'Английский язык',
			id: 1,
		},
		{
			title: 'Казахский язык',
			id: 2,
		},
		{
			title: 'Математика',
			id: 3,
		},
		{
			title: 'Физ-ра',
			id: 4,
		},
	];

	const onSearch = (searchText) => {
		setOptions([
			...array
				.filter(item => item.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
				.map(item => ({ label: item.title, value: item.title }))
		]);
	};

	useEffect(() => {
		const screenWidth = window.screen.width;

		if (screenWidth <= 1024 && screenWidth > 768) {
			setStateSpan(8);
		} else if (screenWidth <= 768 && screenWidth > 425) {
			setStateSpan(12);
		} else if (screenWidth <= 425) setStateSpan(24);

		setOptions([
			...array.map(item => ({ label: item.title, value: item.id }))
		])
	}, []);

	return (
		<div className='cardlist'>
			<Typography.Title level={1} style={{ textAlign: 'center', margin: '15px 0' }}>Предметный лист</Typography.Title>

			<div className="cardlist-filter">
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
					options={[
						{
							value: 'строка',
							title: 'строка'
						}
					]}
				/>
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