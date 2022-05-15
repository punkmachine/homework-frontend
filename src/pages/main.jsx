import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Select, message, Button, Modal, Form, Input } from 'antd';
import { useSelector } from 'react-redux';

import { useGetLessonsListQuery, useCreateLessonMutation, useDeleteLessonMutation } from '../api/lessons';

import { CardLesson } from '../components/cardLesson';
import { Spinner } from '../components/app/spinner';

import { rules } from '../utils/rules';

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
						allowClear
					/>
					<Select
						placeholder='Семестр'
						className='filter-item'
					// options={ }
					/>
				</div>
			</div>

			<div className="cards">
				<Row gutter={[20, 20]} justify='center'>
					{lessonList.map((item, index) =>
						<Col span={stateSpan} key={index}>
							<CardLesson
								deleteLesson={deleteLesson}
								hidden={!isAuth}
								name={item.name}
								id={item.id}
							/>
						</Col>
					)}
				</Row>
			</div>

			<div className="create-lesson">
				<Modal
					visible={visible}
					okText='Создать'
					cancelText='Отмена'
					onCancel={cancelClick}
					title='Создание предмета'
					destroyOnClose
					onOk={createLesson}
				>
					<Form form={form}>
						<Form.Item
							name='name'
							rules={rules.noNumber}
						>
							<Input
								onPressEnter={createLesson}
								placeholder='Введение название'
							/>
						</Form.Item>
					</Form>
				</Modal>
			</div>
		</div>
	);
}

export { MainPage };