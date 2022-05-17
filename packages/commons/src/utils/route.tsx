import React, { FC, PropsWithChildren } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { AuthorizeRoute } from '@commons/components/Auth';

export interface RouterProviderProps {
    text?: string;
}

export const RouterProvider: FC<RouterProviderProps> = (props: PropsWithChildren<RouterProviderProps>) => {
    const { children } = props;
    return <Router>{children}</Router>;
};

export interface RouteWrapperProps {
    authenticated?: boolean;
    authority?: string | string[];
    element?: React.ReactNode;
}

export const RouteWrapper: FC<RouteWrapperProps> = (props: PropsWithChildren<RouteWrapperProps>) => {
    const { authenticated = false, element } = props;
    if (authenticated) {
        return <AuthorizeRoute {...props} />;
    } else {
        return element;
    }
};
