import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { createStore } from '@commons/store';

const { store } = createStore();

export const AppStoreProvider: FC = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};
