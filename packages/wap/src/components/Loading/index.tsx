import React, { FC } from 'react';
import { Loading as LoadingComponent } from 'antd-mobile';
//
import './index.scss';

const Loading: FC = () => {
    return (
        <div className="loading-div-container">
            <LoadingComponent />
        </div>
    );
};

export default Loading;
