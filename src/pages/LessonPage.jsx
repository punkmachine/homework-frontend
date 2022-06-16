import React, { useState, useEffect } from 'react';
import { Row, Col, message } from 'antd';
import { useParams } from 'react-router-dom';

import { useGetHomeworkByLessonIdQuery } from '../api/homework';

import { Spinner } from '../components/app/Spinner';
import { CardTask } from '../components/cardTask';
import { MainTitle } from '../components/app/MainTitle';

function LessonPage() {
	const { id } = useParams();

	const { data, isLoading, error } = useGetHomeworkByLessonIdQuery(id);

	const [stateSpan, setStateSpan] = useState(6);
	const [homeworks, setHomeworks] = useState([]);

	useEffect(() => {
		const screenWidth = window.screen.width;

		if (screenWidth <= 1024 && screenWidth > 768) {
			setStateSpan(8);
		} else if (screenWidth <= 768 && screenWidth > 425) {
			setStateSpan(12);
		} else if (screenWidth <= 425) setStateSpan(24);
	}, []);

	useEffect(() => {
		if (data) setHomeworks([...data.homeworks]);
	}, [data]);

	if (isLoading) {
		return <Spinner />
	}

	if (error) message.error(error);

	return (
		<div className="lesson-container">
			<MainTitle text={`Урок - ${id}`} />
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