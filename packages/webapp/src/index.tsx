import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//
import '@/index.scss';
//
import App from '@/App';
import env from '@commons/utils/env';
import store from '@/store';
import { setup } from '@/utils';

setup();

if (env.mock.enabled) {
    import('@commons/mock').then(() => {
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.getElementById('root'),
        );
    });
} else {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root'),
    );
}
