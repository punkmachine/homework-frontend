import { api } from './api';
import { HOMEWORK_LIST } from '../constants/rtk';

const endpoint = 'homework';

export const homeworkApi = api.injectEndpoints({
	reducerPath: 'homeworkApi',
	endpoints: (builder) => ({
		getHomeworkList: builder.query({
			query: () => `${endpoint}`,
		}),
		createHomework: builder.mutation({
			query: (body) => ({
				url: `${endpoint}/create`,
				method: 'POST',
				body
			}),
			invalidatesTags: [{ type: HOMEWORK_LIST }],
		}),
		editHomework: builder.mutation({
			query: (body) => ({
				url: `${endpoint}/edit`,
				method: 'PUT',
				body
			}),
			invalidatesTags: [{ type: HOMEWORK_LIST }],
		}),
		deleteHomework: builder.mutation({
			query: (id) => ({
				url: `${endpoint}/delete/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: HOMEWORK_LIST }],
		}),
		getHomeworkById: builder.query({
			query: (id) => `${endpoint}/get/${id}`,
		}),
		getHomeworkByLessonId: builder.query({
			query: (id) => `${endpoint}/filter/${id}`,
			providesTags: (result) =>
				result.homework
					? [
						...result.homeworks.map(({ id }) => ({ type: HOMEWORK_LIST, id })),
						{ type: HOMEWORK_LIST },
					]
					: [{ type: HOMEWORK_LIST }],
		}),
	}),
	overrideExisting: false,
})

export const {
	useGetHomeworkListQuery,
	useGetHomeworkByIdQuery,
	useGetHomeworkByLessonIdQuery,

	useCreateHomeworkMutation,
	useEditHomeworkMutation,
	useDeleteHomeworkMutation,
} = homeworkApi;