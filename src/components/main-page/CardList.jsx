import React from 'react';
import { Row, Col } from 'antd';
import { CardLesson } from './CardLesson';

function CardList(props) {
	const { lessonList, stateSpan, deleteLesson, isAuth } = props;

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
						/>
					</Col>);
				})}
			</Row>
		</div>
	);
}

export { CardList };