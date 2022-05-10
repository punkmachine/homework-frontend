import { api } from './api';
import { LESSONS_LIST } from '../constants/rtk';

const endpoint = 'lessons'

export const lessonsApi = api.injectEndpoints({
	reducerPath: 'lessonsApi',
	endpoints: (builder) => ({
		getLessonsList: builder.query({
			query: () => `${endpoint}`,
			providesTags: [LESSONS_LIST],
		}),
		createLesson: builder.mutation({
			query: (body) => ({
				url: `${endpoint}/create`,
				method: 'POST',
				body
			}),
			invalidatesTags: [LESSONS_LIST],
		}),
		deleteLesson: builder.mutation({
			query: (id) => ({
				url: `${endpoint}/delete/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: [LESSONS_LIST],
		}),

		//отсутствовал lesson update.
	}),
	overrideExisting: false,
})

export const {
	useGetLessonsListQuery,
	useCreateLessonMutation,
	useDeleteLessonMutation,
} = lessonsApi;