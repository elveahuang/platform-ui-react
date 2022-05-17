import React, { FC, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { AxiosResponse } from 'axios';
//
import { AntdConfigProvider } from '@/utils/antd';
import { Loading } from '@/components';
import { AppSwrConfigProvider } from '@commons/utils/swr';
import { AppIntlProvider } from '@commons/utils/intl';
import { AppTitleProvider } from '@commons/utils/helmet';
import { AppToastProvider } from '@commons/utils/toast';
import { RouterProvider } from '@commons/utils/route';
//
import './App.scss';
//
import { useAppDispatch, useAppSelector } from '@/store';
import { RenderRouter } from '@/router';
import { CommonService, UserService } from '@commons/services';
import { setUser } from '@commons/store/user';
import { initialize } from '@commons/store/app';
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
        <Loading />
    ) : (
        <AppIntlProvider>
            <AppSwrConfigProvider>
                <AppToastProvider />
                <AppTitleProvider />
                <AntdConfigProvider>
                    <RouterProvider>
                        <RenderRouter />
                    </RouterProvider>
                </AntdConfigProvider>
            </AppSwrConfigProvider>
        </AppIntlProvider>
    );
};

export default App;
