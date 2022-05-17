import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { MenuInfo } from 'rc-menu/lib/interface';
import { Col, Dropdown, Layout, Menu, Row } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
//
import './AdminLayout.scss';
import { clear } from '@commons/store/user';
import { changeLang } from '@commons/store/app';
import { toggleSidebar } from '@/store/setting';
import { defaultLang, LangType } from '@commons/utils/i18n';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';

const AdminLayout: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state);

    const handleAccountMenuChange = (info: MenuInfo) => {
        switch (info.key) {
            case 'logout':
                dispatch(clear());
                navigate('/', { replace: true });
                break;
            default:
                break;
        }
    };

    const handleChangeLocale = (info: MenuInfo) => {
        console.log('click ', info.key);

        let selectedLocale;
        switch (info.key) {
            case 'lang_en_us':
                selectedLocale = LangType.EN_US;
                break;
            case 'label_zh_cn':
                selectedLocale = LangType.ZH_CN;
                break;
            case 'label_zh_tw':
                selectedLocale = LangType.ZH_TW;
                break;
            default:
                selectedLocale = defaultLang;
                break;
        }
        dispatch(changeLang(selectedLocale));
    };

    return (
        <Layout className="admin-layout">
            <Layout.Sider className="admin-layout-sider" collapsed={state.setting.sidebarCollapsed}>
                <div className="admin-layout-logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        nav 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                        nav 2
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                        nav 3
                    </Menu.Item>
                    <Menu.Item key="4" icon={<UserOutlined />}>
                        nav 4
                    </Menu.Item>
                </Menu>
            </Layout.Sider>

            <Layout className="admin-content-layout">
                <Layout.Header className="admin-content-layout-header">
                    <Row justify="end">
                        <Col flex="64px">
                            {React.createElement(
                                state.setting.sidebarCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                                {
                                    className: 'trigger',
                                    onClick: () => {
                                        dispatch(toggleSidebar(!state.setting.sidebarCollapsed));
                                    },
                                },
                            )}
                        </Col>
                        <Col flex="auto">
                            <div className="admin-content-layout-header-nav">
                                <Dropdown
                                    overlay={
                                        <Menu className="dropdown-menu" onClick={handleAccountMenuChange}>
                                            <Menu.Item className="dropdown-menu-item" key="account">
                                                <UserOutlined />
                                                <span className="dropdown-menu-label">
                                                    <FormattedMessage id={'user_label_account'} />
                                                </span>
                                            </Menu.Item>
                                            <Menu.Item className="dropdown-menu-item" key="change-password">
                                                <UserOutlined />
                                                <span className="dropdown-menu-label">
                                                    <FormattedMessage id={'user_label_change_password'} />
                                                </span>
                                            </Menu.Item>
                                            <Menu.Item className="dropdown-menu-item" key="preferences">
                                                <UserOutlined />
                                                <span className="dropdown-menu-label">
                                                    <FormattedMessage id={'user_label_preferences'} />
                                                </span>
                                            </Menu.Item>
                                            <Menu.Divider />
                                            <Menu.Item className="dropdown-menu-item" key="logout">
                                                <UserOutlined />
                                                <span className="dropdown-menu-label">
                                                    <FormattedMessage id={'label_logout'} />
                                                </span>
                                            </Menu.Item>
                                        </Menu>
                                    }
                                    placement="bottomRight"
                                >
                                    <span className="action account">
                                        <UserOutlined className="avatar" />
                                        <span className="name">{state?.user?.principal?.nickname}</span>
                                    </span>
                                </Dropdown>
                                <Dropdown
                                    overlay={
                                        <Menu className="dropdown-menu" onClick={handleChangeLocale}>
                                            <Menu.Item className="dropdown-menu-item" key="lang_en_us">
                                                <UserOutlined />
                                                <span className="dropdown-menu-label">
                                                    <FormattedMessage id={'label_en_us'} />
                                                </span>
                                            </Menu.Item>
                                            <Menu.Item className="dropdown-menu-item" key="label_zh_cn">
                                                <UserOutlined />
                                                <span className="dropdown-menu-label">
                                                    <FormattedMessage id={'label_zh_cn'} />
                                                </span>
                                            </Menu.Item>
                                            <Menu.Item className="dropdown-menu-item" key="label_zh_tw">
                                                <UserOutlined />
                                                <span className="dropdown-menu-label">
                                                    <FormattedMessage id={'label_zh_tw'} />
                                                </span>
                                            </Menu.Item>
                                        </Menu>
                                    }
                                    placement="bottomRight"
                                >
                                    <span className="action account">
                                        <span className="name">
                                            <FormattedMessage id={'label_language'} />
                                        </span>
                                    </span>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
                </Layout.Header>
                <Layout.Content className="admin-content-layout-main">
                    <Outlet />
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
