import React, { useEffect, useState } from 'react';
import { message, Form } from 'antd';
import { useSelector } from 'react-redux';

import { useGetLessonsListQuery, useCreateLessonMutation, useDeleteLessonMutation } from '../api/lessons';
import { useModal } from '../hooks/modal';

import { Spinner } from '../components/app/Spinner';
import { MainTitle } from '../components/app/MainTitle';
import { CardListController } from '../components/main-page/CardListController';
import { CardList } from '../components/main-page/CardList';
import { CreateLessonModal } from '../components/main-page/CreateLessonModal';

function MainPage() {
	const isDesktop = window.screen.width <= 425;

	const isAuth = useSelector((state) => state.authReducer.isAuth);
	const [form] = Form.useForm();

	const [visible, toggleVisible] = useModal();

	const { data = {}, isLoading, error } = useGetLessonsListQuery();
	const { lessons = [] } = data;
	const [create] = useCreateLessonMutation();
	const [del] = useDeleteLessonMutation();

	const [lessonList, setLessonList] = useState([]);

	function cancelClick() {
		toggleVisible(false);
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
				toggleVisible(false);
				form.resetFields();
			}
		} catch (error) {
			console.log(error);
		}
	}

	function onSearch(event) {
		const searchText = event.target.value;
		setLessonList([
			...lessons.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
		]);
	};

	useEffect(() => {
		if (lessons.length > 0) setLessonList([...lessons]);
	}, [lessons]);

	if (isLoading) {
		return <Spinner />
	}

	if (error) message.error(error);

	return (
		<div className='cardlist'>
			<MainTitle text='Предметный лист' />
			<CardListController
				showModalClick={() => toggleVisible(true)}
				isAuth={isAuth}
				isDesktop={isDesktop}
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