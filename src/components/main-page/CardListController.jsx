import React from 'react';
import { Select, Button, Input } from 'antd';

function CardListController(props) {
	const { showModalClick, isAuth, toggleShowFilters, isDesktop, showFilters, onSearch } = props;

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
					disabled={!isAuth}
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
					allowClear />
				<Select
					placeholder='Семестр'
					className='filter-item' />
			</div>
		</div>
	);
}

export { CardListController };