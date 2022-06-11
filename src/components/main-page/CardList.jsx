import React from 'react';
import { Row, Col } from 'antd';
import { CardLesson } from './CardLesson';

function CardList(props) {
	const { lessonList, deleteLesson, isAuth } = props;

	const screenWidth = window.screen.width;
	let stateSpan = 6;

	if (screenWidth <= 1024 && screenWidth > 768) {
		stateSpan = 8;
	} else if (screenWidth <= 768 && screenWidth > 425) {
		stateSpan = 12;
	} else if (screenWidth <= 425) {
		stateSpan = 24;
	};

	return (
		<div className="cards">
			<Row gutter={[20, 20]} justify='center'>
				{lessonList.map((item, index) => {
					return (<Col span={stateSpan} key={index}>
						<CardLesson
							deleteLesson={deleteLesson}
							hidden={!isAuth}
							name={item.name}
							id={item.id}
							count={item.count}
						/>
					</Col>);
				})}
			</Row>
		</div>
	);
}

export { CardList };