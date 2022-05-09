import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	jwt: null,
	user: null,
	isAuth: false,
};

export const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		loginAction: (state, action) => {
			const { payload } = action;
			const { id, jwt, name } = payload;

			const newUser = {
				name, id
			}

			state.user = { ...newUser };
			state.jwt = jwt;
			localStorage.setItem('user', JSON.stringify(newUser));
			state.isAuth = true;
		},
		logoutAction: (state) => {
			console.log('done');
			state = { ...initialState };

			console.log(state);
		},
		refeachState: (state) => {
			let cookieJWT = document.cookie
				.split(';')
				.map(item => {
					const index = item.indexOf('=');
					const key = item.slice(0, index);
					const value = item.slice(index + 1, item.length);

					return {
						[key]: value,
					};
				})
				.filter(item => item.jwt);

			state.jwt = cookieJWT[0]?.jwt ?? null;
			state.user = JSON.parse(localStorage.getItem('user'));
			state.isAuth = !!state.jwt;
		}
	}
});

export const authReducer = authSlice.reducer;
export const { loginAction, logoutAction, refeachState } = authSlice.actions;