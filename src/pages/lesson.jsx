import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, } from 'antd';
import { useParams } from 'react-router-dom';
import { CardTask } from '../components/cardTask';

function LessonPage() {
	const { id } = useParams();

	const [stateSpan, setStateSpan] = useState(6);

	const homeworks = [
		{
			id: 1,
			title: 'title',
			description: 'description',
			createTime: 'createTime',
			author: 'author',
			expireDate: 'expireDate',
		},
		{
			id: 2,
			title: 'title',
			description: 'description',
			createTime: 'createTime',
			author: 'author',
			expireDate: 'expireDate',
		},
		{
			id: 3,
			title: 'title',
			description: 'description',
			createTime: 'createTime',
			author: 'author',
			expireDate: 'expireDate',
		},
		{
			id: 3,
			title: 'title',
			description: 'description',
			createTime: 'createTime',
			author: 'author',
			expireDate: 'expireDate',
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
		<div className="lesson-container">
			<Typography.Title level={1} style={{ textAlign: 'center', margin: '15px 0' }}>Урок - {id}</Typography.Title>

			<div className="cards">
				<Row gutter={[20, 20]} justify='center'>
					{homeworks.map((item, index) =>
						<Col span={stateSpan} key={index}>
							<CardTask {...item} />
						</Col>
					)}
				</Row>
			</div>
		</div>
	);
}

export { LessonPage };