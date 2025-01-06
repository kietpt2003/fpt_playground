import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../constants/entities/User';

// Tạo một slice để quản lý trạng thái auth
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        user: null as User | null,
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
