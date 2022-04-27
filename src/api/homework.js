import { api } from './api';

const endpoint = 'homework'

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
		}),
		editHomework: builder.mutation({
			query: (body) => ({
				url: `${endpoint}/edit`,
				method: 'PUT',
				body
			}),
		}),
		deleteHomework: builder.mutation({
			query: (id) => ({
				url: `${endpoint}/delete/${id}`,
				method: 'DELETE',
			}),
		}),
		getHomeworkById: builder.query({
			query: (id) => `${endpoint}/get/${id}`,
		}),
		getHomeworkByLessonId: builder.query({
			query: (id) => `${endpoint}/filter/${id}`,
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