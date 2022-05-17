import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingState {
    msg: string;
}

const initialSettingState: SettingState = {
    msg: 'msg',
};

export const settingSlice = createSlice({
    name: 'setting',
    initialState: initialSettingState,
    reducers: {
        setText: (state: SettingState, action: PayloadAction<string>) => {
            state.msg = action.payload;
            console.log(state.msg);
            return state;
        },
    },
});

export const { setText } = settingSlice.actions;

export default settingSlice.reducer;
