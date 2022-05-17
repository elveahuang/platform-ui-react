import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

export const AppTitleProvider: FC = () => {
    const intl = useIntl();
    return (
        <Helmet
            title={intl.formatMessage({
                id: 'site_title',
                defaultMessage: 'Title',
            })}
        />
    );
};
