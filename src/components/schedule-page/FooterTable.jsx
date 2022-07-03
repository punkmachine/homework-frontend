import React from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

function FooterTable({ hidden, click }) {
	return (
		<div className='flex justify-center' hidden={hidden}>
			<Button
				type='primary'
				icon={<PlusCircleOutlined />}
				className='flex align-center'
				onClick={click}
			>
				Добавить
			</Button>
		</div>
	);
}

export { FooterTable };