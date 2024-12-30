import { createSlice } from '@reduxjs/toolkit';

interface User {
    name: string; // Các thuộc tính khác nếu có
    email?: string;
}

// Tạo một slice để quản lý trạng thái auth
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        user: null as any | null,
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
