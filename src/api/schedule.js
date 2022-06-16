import { api } from './api';
import { SCHEDULE_LIST } from '../constants/rtk';

const endpoint = 'schedule'

export const scheduleApi = api.injectEndpoints({
	reducerPath: 'scheduleApi',
	endpoints: (builder) => ({
		getSchedule: builder.query({
			query: () => `${endpoint}`,
			providesTags: [SCHEDULE_LIST],
		}),
		createScheduleItem: builder.mutation({
			query: (body) => ({
				url: `${endpoint}/create`,
				method: 'POST',
				body
			}),
			invalidatesTags: [SCHEDULE_LIST],
		}),
		deleteScheduleItem: builder.mutation({
			query: (id) => ({
				url: `${endpoint}/delete/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: [SCHEDULE_LIST],
		}),
		updateScheduleItem: builder.mutation({
			query: (body) => ({
				url: `${endpoint}/edit`,
				method: 'PUT',
				body
			}),
			invalidatesTags: [SCHEDULE_LIST],
		}),
	}),
	overrideExisting: false,
})

export const {
	useGetScheduleQuery,
	useCreateScheduleItemMutation,
	useDeleteScheduleItemMutation,
	useUpdateScheduleItemMutation,
} = scheduleApi;