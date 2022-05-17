import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Principal } from '@commons/types/user';
import storage from '@commons/utils/storage';

interface UserState {
    authenticated: boolean;
    accessToken: string;
    refreshToken: string;
    principal: Principal;
}

const initialUserState: UserState = {
    authenticated: false,
    accessToken: storage.getAccessToken() || null,
    refreshToken: storage.getRefreshToken() || null,
    principal: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setAccessToken: (state: UserState, action: PayloadAction<string>) => {
            storage.setAccessToken(action.payload);
            console.log(storage.getAccessToken());
            return { ...state, accessToken: action.payload };
        },
        setRefreshToken: (state: UserState, action: PayloadAction<string>) => {
            storage.setRefreshToken(action.payload);
            return { ...state, refreshToken: action.payload };
        },
        setUser: (state: UserState, action: PayloadAction<Principal>) => {
            state.authenticated = true;
            state.principal = action.payload;
            return state;
        },
        clear: (state: UserState) => {
            storage.removeAccessToken();
            storage.removeRefreshToken();
            return { ...state, authenticated: false, principal: null, refreshToken: null, accessToken: null };
        },
    },
});

export const { setAccessToken, setRefreshToken, setUser, clear } = userSlice.actions;

export default userSlice.reducer;
