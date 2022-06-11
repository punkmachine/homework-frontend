import React from 'react';
import { Select, Button, Input } from 'antd';
import { useToggle } from '../../hooks/toggle';

function CardListController(props) {
	const { showModalClick, isAuth, isDesktop, onSearch } = props;

	const [showFilters, toggleShowFilters] = useToggle(!isDesktop);

	return (
		<div className='cardlist-controller'>
			<div className='cardlist-controller-button'>
				<Button
					type='primary'
					onClick={showModalClick}
					disabled={!isAuth}
					hidden={!isAuth}
				>
					Добавить
				</Button>
				<Button
					type='primary'
					onClick={toggleShowFilters}
					disabled={!isDesktop}
					hidden={!isDesktop}
				>
					Фильтра
				</Button>
			</div>
			<div className='cardlist-controller-filter' hidden={!showFilters}>
				<Input
					className='filter-item'
					placeholder='Поиск...'
					onChange={onSearch}
					allowClear
				/>
				{/* <Select
					placeholder='Семестр'
					className='filter-item'
				/> */}
			</div>
		</div>
	);
}

export { CardListController };