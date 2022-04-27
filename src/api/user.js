import { api } from './api';

const endpoint = 'account'

export const userApi = api.injectEndpoints({
	reducerPath: 'userApi',
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body) => ({
				url: `${endpoint}/login`,
				method: 'POST',
				body,
			}),
		}),
		register: builder.mutation({
			query: (body) => ({
				url: `${endpoint}/reg`,
				method: 'POST',
				body,
			}),
		}),
		deleteUser: builder.mutation({
			query: (body) => ({
				url: `${endpoint}/delete`,
				method: 'DELETE',
				body,
			})
		}),
		editUser: builder.mutation({
			query: (body) => ({
				url: `${endpoint}/change`,
				method: 'PUT',
				body,
			}),
		})
	}),
	overrideExisting: false,
})

export const {
	useLoginMutation,
	useRegisterMutation,
	useDeleteUserMutation,
	useEditUserMutation,
} = userApi;