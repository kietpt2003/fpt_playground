import { createSlice } from '@reduxjs/toolkit';
import { UserResponse } from '../../constants/models/users/UserResponse';

// Tạo một slice để quản lý trạng thái auth
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        user: null as UserResponse | null,
        mail: null as string | null,
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload;
            state.mail = null;
        },
        loginWithoutUser(state, action) {
            state.isLoggedIn = true;
            state.user = null;
            state.mail = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.user = null;
            state.mail = null;
        },
    },
});

export const { login, loginWithoutUser, logout } = authSlice.actions;
export default authSlice.reducer;
