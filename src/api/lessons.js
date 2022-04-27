import { api } from './api';

const endpoint = 'lessons'

export const lessonsApi = api.injectEndpoints({
	reducerPath: 'lessonsApi',
	endpoints: (builder) => ({
		getLessonsList: builder.query({
			query: () => `${endpoint}`
		}),
		createLesson: builder.mutation({
			query: (body) => ({
				url: `${endpoint}/create`,
				method: 'POST',
				body
			}),
		}),
		deleteLesson: builder.mutation({
			query: (id) => ({
				url: `${endpoint}/delete/${id}`,
				method: 'DELETE'
			}),
		}),

		//отсутствовал lesson update.
	}),
	overrideExisting: false,
})

export const {

} = lessonsApi;