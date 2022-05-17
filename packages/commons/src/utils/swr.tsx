import { SWRConfig, SWRConfiguration } from 'swr';
import React, { FC } from 'react';

const config: SWRConfiguration = {
    revalidateOnFocus: false,
};

const AppSwrConfigProvider: FC = ({ children }) => {
    return <SWRConfig value={config}>{children}</SWRConfig>;
};

export { AppSwrConfigProvider };
