import React from 'react';
import { Typography } from 'antd';

function MainTitle({ text }) {
	return (
		<Typography.Title level={1} className='main-title'>{text}</Typography.Title>
	);
}

export { MainTitle };