import React, { FC } from 'react';
//
import './Home.scss';
import { Button } from 'antd';

const Home: FC = () => {
    return (
        <div className="home-container">
            <div className="home-banner">
                <div className="home-banner-background" />
                <div className="home-banner-holder">
                    <div className="home-banner-content">Banner</div>
                </div>
            </div>
            <div className="text-center" style={{ height: 300 }}>
                <Button type="primary">Primary Button</Button>
            </div>
        </div>
    );
};

export default Home;
