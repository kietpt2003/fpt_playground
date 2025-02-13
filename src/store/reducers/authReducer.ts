import { createSlice } from '@reduxjs/toolkit';
import { UserResponse } from '../../constants/models/UserResponse';

// Tạo một slice để quản lý trạng thái auth
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        user: null as UserResponse | null,
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
