import { api } from './api';
import { LESSONS_LIST } from '../constants/rtk';

const endpoint = 'lessons';

export const lessonsApi = api.injectEndpoints({
	reducerPath: 'lessonsApi',
	endpoints: (builder) => ({
		getLessonsList: builder.query({
			query: () => `${endpoint}`,
			providesTags: (result) =>
				result.lessons
					? [
						...result.lessons.map(({ id }) => ({ type: LESSONS_LIST, id })),
						{ type: LESSONS_LIST },
					]
					: [{ type: LESSONS_LIST }],
		}),
		createLesson: builder.mutation({
			query: (body) => ({
				url: `${endpoint}/create`,
				method: 'POST',
				body
			}),
			invalidatesTags: [{ type: LESSONS_LIST }],
		}),
		deleteLesson: builder.mutation({
			query: (id) => ({
				url: `${endpoint}/delete/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: [{ type: LESSONS_LIST }],
		}),
		updateLesson: builder.mutation({
			query: (body) => ({
				url: `${endpoint}/edit`,
				method: 'PUT',
				body
			}),
			invalidatesTags: [{ type: LESSONS_LIST }],
		}),
	}),
	overrideExisting: false,
})

export const {
	useGetLessonsListQuery,
	useCreateLessonMutation,
	useDeleteLessonMutation,
	useUpdateLessonMutation,
} = lessonsApi;