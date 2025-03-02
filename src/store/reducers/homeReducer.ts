import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        isOpenDailyCheckPoint: false,
        homeGuideline: true,
    },
    reducers: {
        setIsOpenDailyCheckPoint(state, action) {
            state.isOpenDailyCheckPoint = action.payload;
        },
        setHomeGuideline(state, action) {
            state.homeGuideline = action.payload;
        },
    },
});

export const { setIsOpenDailyCheckPoint, setHomeGuideline } = homeSlice.actions;
export default homeSlice.reducer;
