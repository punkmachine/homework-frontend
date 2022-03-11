import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// import { api } from '../services/api'
// import '../services/auth'

const reducer = {
	// [api.reducerPath]: api.reducer,
}

export const store = configureStore({
	reducer,
	// middleware: (getDefaultMiddleware) =>
	// 	getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

setupListeners(store.dispatch);

export const state = store.getState();