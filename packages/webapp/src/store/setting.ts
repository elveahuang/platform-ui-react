import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingState {
    text: string;
    sidebarCollapsed: boolean;
}

const initialSettingState: SettingState = {
    text: 'SettingState',
    sidebarCollapsed: false,
};

export const settingSlice = createSlice({
    name: 'setting',
    initialState: initialSettingState,
    reducers: {
        /**
         * 初始化应用
         */
        toggleSidebar: (state: SettingState, action: PayloadAction<boolean>) => {
            return { ...state, sidebarCollapsed: action.payload };
        },
    },
});

export const { toggleSidebar } = settingSlice.actions;

export default settingSlice.reducer;
