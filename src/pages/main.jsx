import React, { useEffect, useState } from 'react';
import { Typography, message, Form } from 'antd';
import { useSelector } from 'react-redux';

import { useGetLessonsListQuery, useCreateLessonMutation, useDeleteLessonMutation } from '../api/lessons';

import { Spinner } from '../components/app/spinner';
import { CardListController } from '../components/main-page/CardListController';
import { CardList } from '../components/main-page/CardList';
import { CreateLessonModal } from '../components/main-page/CreateLessonModal';

function MainPage() {
	const isAuth = useSelector((state) => state.authReducer.isAuth);

	const [form] = Form.useForm();

	const [create] = useCreateLessonMutation();
	const [del] = useDeleteLessonMutation();

	const { data = [], isLoading, error } = useGetLessonsListQuery();
	const { lessons = [] } = data;

	const [stateSpan, setStateSpan] = useState(6);
	const [visible, setVisible] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);
	const [showFilters, setShowFilters] = useState(true);
	const [lessonList, setLessonList] = useState([]);

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

	function onSearch(event) {
		const searchText = event.target.value;
		setLessonList([
			...lessons.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
		]);
	};

	const toggleShowFilters = () => setShowFilters((prevState) => !prevState);

	useEffect(() => {
		const screenWidth = window.screen.width;

		if (screenWidth <= 1024 && screenWidth > 768) {
			setStateSpan(8);
		} else if (screenWidth <= 768 && screenWidth > 425) {
			setStateSpan(12);
		} else if (screenWidth <= 425) {
			setStateSpan(24);
			setIsDesktop(true);
			setShowFilters(false);
		};
	}, []);

	useEffect(() => {
		if (lessons.length > 0) setLessonList([...lessons]);
	}, [isLoading])

	if (isLoading) {
		return <Spinner />
	}
	if (error) message.error(error);

	return (
		<div className='cardlist'>
			<Typography.Title level={1} style={{ textAlign: 'center', margin: '15px 0' }}>Предметный лист</Typography.Title>
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
				stateSpan={stateSpan}
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