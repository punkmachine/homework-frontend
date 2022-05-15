import React, { useEffect, useState } from 'react';
import { message, Form } from 'antd';
import { useSelector } from 'react-redux';

import { useGetLessonsListQuery, useCreateLessonMutation, useDeleteLessonMutation } from '../api/lessons';

import { Spinner } from '../components/app/Spinner';
import { MainTitle } from '../components/app/MainTitle';
import { CardListController } from '../components/main-page/CardListController';
import { CardList } from '../components/main-page/CardList';
import { CreateLessonModal } from '../components/main-page/CreateLessonModal';

function MainPage() {
	const isAuth = useSelector((state) => state.authReducer.isAuth);

	const { data = [], isLoading, error } = useGetLessonsListQuery();
	const { lessons = [] } = data;

	const [create] = useCreateLessonMutation();
	const [del] = useDeleteLessonMutation();

	const [form] = Form.useForm();

	const [visible, setVisible] = useState(false);
	const [showFilters, setShowFilters] = useState(true);
	const [lessonList, setLessonList] = useState([]);

	const isDesktop = window.screen.width <= 425;

	const showModalClick = () => setVisible(true);

	function cancelClick() {
		setVisible(false);
		form.resetFields();
	};

	async function deleteLesson(id) {
		try {
			const { data } = await del(id);
			const { success, msg } = data;

			if (!success) {
				message.error(msg);
			} else {
				message.success(msg);
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function createLesson() {
		try {
			const formData = await form.validateFields();

			const { data } = await create(formData);
			const { success, msg } = data;

			if (!success) {
				message.error(msg);
			} else {
				message.success(msg);
				setVisible(false);
				form.resetFields();
			}
		} catch (error) {
			console.log(error);
		}
	}

	// FIX: сделать хук useSearch
	function onSearch(event) {
		const searchText = event.target.value;
		setLessonList([
			...lessons.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
		]);
	};

	// FIX: сделать хук useToggle;
	const toggleShowFilters = () => setShowFilters((prevState) => !prevState);

	useEffect(() => {
		if (lessons.length > 0) setLessonList([...lessons]);
	}, [isLoading]);

	useEffect(() => {
		setShowFilters(!(window.screen.width <= 425));
	}, []);

	if (isLoading) {
		return <Spinner />
	}

	// FIX: сделать компонент вывода ошибок
	if (error) message.error(error);

	return (
		<div className='cardlist'>
			<MainTitle text='Предметный лист' />
			<CardListController
				showModalClick={showModalClick}
				isAuth={isAuth}
				toggleShowFilters={toggleShowFilters}
				isDesktop={isDesktop}
				showFilters={showFilters}
				onSearch={onSearch}
			/>
			<CardList
				lessonList={lessonList}
				deleteLesson={deleteLesson}
				isAuth={isAuth}
			/>
			<CreateLessonModal
				visible={visible}
				cancelClick={cancelClick}
				createLesson={createLesson}
				form={form}
			/>
		</div>
	);
}

export { MainPage };