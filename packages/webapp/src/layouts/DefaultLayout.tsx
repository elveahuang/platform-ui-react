import React, { FC, PropsWithChildren } from 'react';
import { useIntl } from 'react-intl';
import { Layout } from 'antd';
import classNames from 'classnames';
//
import './DefaultLayout.scss';

export interface DefaultLayoutProps {
    layoutClassName?: string;
    children?: React.ReactNode;
}

const DefaultLayout: FC<DefaultLayoutProps> = (props: PropsWithChildren<DefaultLayoutProps>) => {
    const { children, layoutClassName } = props;
    const intl = useIntl();

    return (
        <Layout className={classNames('default-layout', layoutClassName || '')}>
            <Layout.Content>{children}</Layout.Content>
            <Layout.Footer id="footer">
                {intl.formatMessage(
                    {
                        id: 'site_copyright',
                    },
                    {
                        curDate: new Date(),
                    },
                )}
            </Layout.Footer>
        </Layout>
    );
};

export default DefaultLayout;
