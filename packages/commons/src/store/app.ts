import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultLang, LangType } from '@commons/utils/i18n';
import { applicationVersion } from '@commons/constants';
import { changeTheme as changeBaseTheme, defaultTheme, DirectionType, ThemeType } from '@commons/utils/theme';
import env from '@commons/utils/env';

export interface AppState {
    initialized: boolean;
    lang: LangType;
    timeZone: string;
    theme: ThemeType;
    direction: DirectionType;
}

export const initialAppState: AppState = {
    initialized: false,
    lang: defaultLang,
    timeZone: '',
    theme: defaultTheme,
    direction: DirectionType.LTR,
};

export const appSlice = createSlice({
    name: 'app',
    initialState: initialAppState,
    reducers: {
        /**
         * 初始化
         */
        initialize: (state: AppState) => {
            if (!env.production) {
                console.log(`Current Version = ${applicationVersion}`);
            }
            state.initialized = true;
            return state;
        },
        /**
         * 切换语言
         */
        changeLang: (state: AppState, action: PayloadAction<LangType>) => {
            return { ...state, lang: action.payload };
        },
        /**
         * 切换主题
         */
        changeTheme: (state: AppState, action: PayloadAction<ThemeType>) => {
            changeBaseTheme(action.payload);
            return { ...state, theme: action.payload };
        },
        /**
         * 切换对其方式
         */
        changeDirection: (state: AppState, action: PayloadAction<DirectionType>) => {
            return { ...state, direction: action.payload };
        },
    },
});

export const { initialize, changeLang, changeTheme, changeDirection } = appSlice.actions;

export default appSlice.reducer;
