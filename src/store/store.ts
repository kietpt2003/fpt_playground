import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/reducers/authReducer';
import themeReducer from '../store/reducers/themeReducer';
import homeReducer from '../store/reducers/homeReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        home: homeReducer
    },
});

// Định nghĩa RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;