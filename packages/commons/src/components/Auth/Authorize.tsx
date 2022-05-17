import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useBaseSelector } from '@commons/hooks';
import { hasAuthority } from '@commons/utils/auth';

export interface AuthorizeProps {
    authority?: string | Array<string>;
    noMatch?: ReactNode;
}

const Authorize: FC<AuthorizeProps> = (props) => {
    const { children, noMatch = <Navigate to={'/403'} />, authority } = props;
    const { principal, authenticated } = useBaseSelector((state) => state.user);
    const render = typeof children === 'undefined' ? null : children;
    const result = authenticated ? hasAuthority(authority, principal.authorities) : true;
    return <>{result ? render : noMatch}</>;
};

export default Authorize;
