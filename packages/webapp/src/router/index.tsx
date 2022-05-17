import React, { FC, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
//
import routes from '@/router/routes';
import { Loading } from '@/components';

export const RenderRouter: FC = () => {
    return <Suspense fallback={<Loading />}>{useRoutes(routes)}</Suspense>;
};
