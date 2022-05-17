import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
//
import { RouteWrapper } from '@commons/utils/route';
// 基础页面
const Home = lazy(() => import('@/pages/Home'));

const routes: RouteObject[] = [
    {
        path: '/',
        element: <RouteWrapper element={<Home />} />,
    },
    {
        path: '*',
        element: <RouteWrapper element={<Home />} />,
    },
];

export default routes;
