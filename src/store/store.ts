import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/reducers/authReducer';  // Giả sử bạn có một reducer quản lý state auth
import themeReducer from '../store/reducers/themeReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer
    },
});

// Định nghĩa RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;