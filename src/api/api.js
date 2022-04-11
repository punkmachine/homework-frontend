import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://homework.webdev.kz/',
		// prepareHeaders: (headers, { getState }) => {
		// 	const token = JSON.parse(localStorage.getItem('token'));
		// 	if (token) headers.set('Authorization', `Bearer ${token}`);
		// 	return headers
		// },
	}),
	endpoints: () => ({}),
})
