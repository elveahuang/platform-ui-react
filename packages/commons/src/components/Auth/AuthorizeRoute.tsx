import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useBaseSelector } from '@commons/hooks';
import { hasAuthority } from '@commons/utils/auth';

export interface AuthorizeRouteProps {
    authenticated?: boolean;
    authority?: string | string[];
    element?: React.ReactNode;
}

const AuthorizeRoute: FC<AuthorizeRouteProps> = (props: AuthorizeRouteProps) => {
    const { authority, element } = props;
    const { authenticated = false, principal } = useBaseSelector((state) => state.user);
    const checkResult = authenticated && hasAuthority(authority, principal.authorities);
    console.log(`AuthorizeRoute - checkResult - ${checkResult}`);
    return <>{checkResult ? element : <Navigate to={'/login'} />}</>;
};

export default AuthorizeRoute;
