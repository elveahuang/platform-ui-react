import React, { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
//
import { AdminLayout, MainLayout } from '@/layouts';
import { RouteWrapper } from '@commons/utils/route';
// 基础页面
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Error = lazy(() => import('@/pages/Error'));
const NoMatch = lazy(() => import('@/pages/NoMatch'));
// 管理页面
const Dashboard = lazy(() => import('@/pages/Admin/Dashboard'));
const Workbench = lazy(() => import('@/pages/Admin/Workbench'));
// 前端页面
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));

const routes: RouteObject[] = [
    {
        path: '/',
        element: <RouteWrapper element={<MainLayout />} />,
        children: [
            {
                path: 'about',
                element: <RouteWrapper element={<About />} />,
            },
            {
                path: 'home',
                element: <RouteWrapper element={<Home />} />,
            },
            {
                path: '',
                element: <Navigate to={'home'} />,
            },
        ],
    },
    {
        path: 'login',
        element: <RouteWrapper element={<Login />} />,
    },
    {
        path: 'register',
        element: <RouteWrapper element={<Register />} />,
    },
    {
        path: 'admin',
        element: <RouteWrapper authenticated={true} element={<AdminLayout />} />,
        children: [
            {
                path: 'workbench',
                element: <RouteWrapper authenticated={true} element={<Workbench />} />,
            },
            {
                path: 'dashboard',
                element: <RouteWrapper authenticated={true} element={<Dashboard />} />,
            },
            {
                path: '',
                element: <Navigate to={'/admin/dashboard'} />,
            },
        ],
    },
    {
        path: 'error',
        element: <RouteWrapper element={<Error />} />,
    },
    {
        path: '*',
        element: <RouteWrapper element={<NoMatch />} />,
    },
];

export default routes;
