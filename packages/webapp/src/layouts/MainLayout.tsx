import React, { FC, Suspense } from 'react';
import { Col, Layout, Menu, Row, Space } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
//
import './MainLayout.scss';
import images from '@commons/utils/images';
import { DirectionSwitch, Loading, ThemeSwitch } from '@/components';

const MainLayout: FC = () => {
    const intl = useIntl();
    const location = useLocation();
    const layoutClassName = classNames('main-layout', location.pathname === '/home' ? 'home-layout' : null);

    return (
        <Layout className={layoutClassName}>
            <Layout.Header id="header" className="header">
                <Row className="header-row">
                    <Col md={6} sm={24}>
                        <span className="header-logo">
                            <img alt="logo" src={images.logo} />
                            <span>Application</span>
                        </span>
                    </Col>
                    <Col md={18} sm={0}>
                        <div className="header-menu">
                            <Menu mode="horizontal">
                                <Menu.Item key="menu-home">
                                    <Link to="/">Home</Link>
                                </Menu.Item>
                                <Menu.Item key="menu-about-us">
                                    <Link to="/about">About Us</Link>
                                </Menu.Item>
                                <Menu.Item key="login">
                                    <Link to="/login">Login</Link>
                                </Menu.Item>
                            </Menu>
                        </div>
                    </Col>
                </Row>
            </Layout.Header>
            <Layout.Content>
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </Layout.Content>
            <Layout.Footer id="footer">
                {intl.formatMessage(
                    {
                        id: 'site_copyright',
                    },
                    {
                        curDate: new Date(),
                    },
                )}
                <Space />
                <ThemeSwitch />
                <DirectionSwitch />
            </Layout.Footer>
        </Layout>
    );
};

export default MainLayout;
