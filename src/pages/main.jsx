import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { CardLesson } from '../components/cardLesson';

function MainPage() {
	const [stateSpan, setStateSpan] = useState(6);

	const array = [
		{
			title: 'Английский язык'
		},
		{
			title: 'Английский язык'
		},
		{
			title: 'Английский язык'
		},
		{
			title: 'Английский язык'
		},
		{
			title: 'Английский язык'
		},
		{
			title: 'Английский язык'
		},
		{
			title: 'Английский язык'
		},
		{
			title: 'Английский язык'
		},
	];

	useEffect(() => {
		const screenWidth = window.screen.width;

		if (screenWidth <= 1024 && screenWidth > 768) {
			setStateSpan(8);
		} else if (screenWidth <= 768 && screenWidth > 425) {
			setStateSpan(12);
		} else if (screenWidth <= 425) setStateSpan(24);
	}, []);

	return (
		<div className='cardList'>
			<Typography.Title level={1} style={{ textAlign: 'center', margin: '15px 0' }}>Предметный лист</Typography.Title>
			<Row gutter={[20, 20]}>
				{array.map((item, index) =>
					<Col span={stateSpan} key={index}>
						<CardLesson {...item} />
					</Col>
				)}
			</Row>
		</div>
	);
}

export { MainPage };