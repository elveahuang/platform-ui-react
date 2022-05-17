import React, { FC } from 'react';
import { Pagination } from 'antd';
import { FormattedMessage } from 'react-intl';
//
import './Dashboard.scss';
//
import { useBaseSelector } from '@commons/hooks';

const Dashboard: FC = () => {
    const state = useBaseSelector((state) => state);
    return (
        <>
            <FormattedMessage id={'site_title'} />
            <div>{state.app.lang}</div>
            <Pagination defaultCurrent={1} total={50} showSizeChanger />
        </>
    );
};

export default Dashboard;
