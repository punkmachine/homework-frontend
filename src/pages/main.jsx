import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Select, AutoComplete, message, Button, Modal, Form, Input } from 'antd';
import { useSelector } from 'react-redux';

import { useGetLessonsListQuery, useCreateLessonMutation, useDeleteLessonMutation } from '../api/lessons';

import { CardLesson } from '../components/cardLesson';
import { Spinner } from '../components/spinner';

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
	const [options, setOptions] = useState([]);

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

	const onSearch = (searchText) => {
		setOptions([
			...lessons
				.filter(item => item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
				.map(item => ({ label: item.name, value: item.id }))
		]);
	};

	useEffect(() => {
		const screenWidth = window.screen.width;

		if (screenWidth <= 1024 && screenWidth > 768) {
			setStateSpan(8);
		} else if (screenWidth <= 768 && screenWidth > 425) {
			setStateSpan(12);
		} else if (screenWidth <= 425) setStateSpan(24);
	}, []);

	useEffect(() => {
		setOptions([
			...lessons.map(item => ({ label: item.name, value: item.name }))
		]);
	}, [isLoading])

	if (isLoading) {
		return <Spinner />
	}

	if (error) {
		message.error(error);
	}

	return (
		<div className='cardlist'>
			<Typography.Title level={1} style={{ textAlign: 'center', margin: '15px 0' }}>Предметный лист</Typography.Title>

			<div className='cardlist-controller'>
				<div>
					<Button
						type='primary'
						onClick={showModalClick}
						disabled={!isAuth}
						hidden={!isAuth}
					>
						Добавить
					</Button>
				</div>
				<div className='cardlist-controller-filter'>
					<AutoComplete
						options={options}
						className='filter-item'
						placeholder='Поиск...'
						onSearch={onSearch}
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
					{lessons.map((item, index) =>
						<Col span={stateSpan} key={index}>
							<CardLesson
								deleteLesson={deleteLesson}
								hidden={!isAuth}
								{...item}
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