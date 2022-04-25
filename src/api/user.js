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
	}),
	overrideExisting: false,
})

export const {
	useLoginMutation,
	useRegisterMutation,
} = userApi;