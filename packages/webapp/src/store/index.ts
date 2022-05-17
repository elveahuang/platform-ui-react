import { createStore } from '@commons/store';
import settingReducer from '@/store/setting';

const reducers = {
    setting: settingReducer,
};

export const { store, useAppDispatch, useAppSelector } = createStore(reducers);

export default store;
