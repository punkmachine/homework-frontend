import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { CardLesson } from '../components/cardLesson';

function MainPage() {
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

	return (
		<div className='cardList'>
			<Typography.Title level={1} style={{ textAlign: 'center', margin: '15px 0' }}>Предметный лист</Typography.Title>
			<Row gutter={[20, 20]}>
				{array.map((item, index) =>
					<Col span={6} key={index}>
						<CardLesson {...item} />
					</Col>
				)}
			</Row>
		</div>
	);
}

export { MainPage };