import React, { FC, useEffect, useState } from 'react';
//
import '@/App.scss';
import { AppIntlProvider } from '@commons/utils/intl';
import { AppSwrConfigProvider } from '@commons/utils/swr';
import { AppToastProvider } from '@commons/utils/toast';
import { AppTitleProvider } from '@commons/utils/helmet';
import { RouterProvider } from '@commons/utils/route';
import { RenderRouter } from '@/router';
import { useAppDispatch, useAppSelector } from '@/store';
import { isEmpty } from 'lodash';
import { CommonService, UserService } from '@commons/services';
import { initialize } from '@commons/store/app';
import { setUser } from '@commons/store/user';
import { AxiosResponse } from 'axios';
import { Principal } from '@commons/types/user';

const App: FC = () => {
    const [loading, setLoading] = useState(true);
    const { accessToken } = useAppSelector((state) => state.user);
    const { initialized } = useAppSelector((state) => state.app);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log(`accessToken - ${accessToken}`);
        if (!isEmpty(accessToken) && !initialized) {
            Promise.all([CommonService.initialize(), UserService.user()])
                .then(async (values) => {
                    console.log(values);
                    dispatch(initialize());
                    dispatch(setUser((values[1] as AxiosResponse<Principal>).data));
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            CommonService.initialize()
                .then((resp) => {
                    console.log(resp);
                    dispatch(initialize());
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    });

    return loading ? (
        <div>Loading</div>
    ) : (
        <AppIntlProvider>
            <AppSwrConfigProvider>
                <AppToastProvider />
                <AppTitleProvider />
                <RouterProvider>
                    <RenderRouter />
                </RouterProvider>
            </AppSwrConfigProvider>
        </AppIntlProvider>
    );
};

export default App;
