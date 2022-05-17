import appReducer from './app';
import userReducer from './user';
import { configureStore, Dispatch, Reducer } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

export type Reducers = Record<string, Reducer>;

export type ReducersState<T> = {
    [P in keyof T]: T[P] extends Reducer<infer S> ? S : any;
};

const defaultReducers = {
    app: appReducer,
    user: userReducer,
};

export type RootState = ReducersState<typeof defaultReducers>;

export type RootDispatch = Dispatch;

export { userReducer, appReducer };

export const createSelector = <T>() => {
    return function useAppSelector<S>(selector: (state: T) => S): S {
        return useSelector<T, S>(selector);
    };
};

export const createStore = <T extends Reducers>(customReducers?: T) => {
    const reducers = { ...defaultReducers, ...customReducers };
    const store = configureStore({
        reducer: reducers,
    });
    const useAppSelector = createSelector<ReducersState<typeof reducers>>();
    const useAppDispatch = () => useDispatch<typeof store.dispatch>();
    return {
        useAppSelector,
        useAppDispatch,
        store,
    };
};
