import React, { FC } from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const AppQueryClientProvider: FC = ({ children }) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export { AppQueryClientProvider };
