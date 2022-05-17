import { createStore } from '@commons/store';
import settingReducer from './setting';

const reducers = {
    setting: settingReducer,
};

export const { store, useAppDispatch, useAppSelector } = createStore(reducers);

export default store;
