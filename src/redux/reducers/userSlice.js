import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'userSlice',
	initialState: { showUser: false },
	reducers: {
		showUser: (state) => {
			state.showUser = true;
		},
		hideUser: (state) => {
			state.showUser = false;
		},
	},
});

export const { showUser, hideUser } = userSlice.actions;

export default userSlice.reducer;
