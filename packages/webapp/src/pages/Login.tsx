import React, { FC } from 'react';
import { Button, Card, Col, Form, Input, Row, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { Store, ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { Link, useNavigate } from 'react-router-dom';
//
import { applicationVersion } from '@commons/constants';
import { UserService } from '@commons/services';
import { useBaseDispatch } from '@commons/hooks';
import { setAccessToken, setRefreshToken, setUser } from '@commons/store/user';
import { ApiAuthTokenResult, ApiResponse } from '@commons/types';
import { Credentials, Principal } from '@commons/types/user';
//
import './Login.scss';
import { DefaultLayout } from '@/layouts';

const initialLoginFormValues: Credentials = {
    username: 'admin',
    password: 'admin',
};

const Login: FC = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const dispatch = useBaseDispatch();

    const onFinish = (values: Store) => {
        UserService.auth({
            grant_type: 'password',
            username: values.username,
            password: values.password,
            client_id: 'webapp',
            client_secret: 'webapp',
            clientVersion: applicationVersion,
        }).then(async (resp: ApiResponse<ApiAuthTokenResult>) => {
            dispatch(setAccessToken(resp.data.access_token));
            dispatch(setRefreshToken(resp.data.refresh_token));
            UserService.user().then(async (resp: ApiResponse<Principal>) => {
                dispatch(setUser(resp.data));
                navigate('/admin', { replace: true });
            });
        });
    };

    const onFinishFailed = (e: ValidateErrorEntity) => {
        console.log(e);
    };

    return (
        <DefaultLayout layoutClassName={'login-page-layout'}>
            <Row justify="center" align="middle" className={'login-container'}>
                <Col span={6}>
                    <Card className={'login-card'} title={intl.formatMessage({ id: 'user_page_login_title' })}>
                        <Form<Credentials>
                            className={'login-form'}
                            initialValues={initialLoginFormValues}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    type="text"
                                    size="large"
                                    placeholder={intl.formatMessage({ id: 'user_field_username' })}
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input.Password
                                    size="large"
                                    prefix={<UserOutlined />}
                                    placeholder={intl.formatMessage({ id: 'user_field_password' })}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button block type="primary" htmlType="submit">
                                    <FormattedMessage id={'button_submit'} />
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Link to="/register">
                                    <Button type="link" htmlType="button">
                                        <FormattedMessage id={'button_register'} />
                                    </Button>
                                </Link>
                                <Space />
                                <Link to="/register">
                                    <Button type="link" className={'right-pull'} htmlType="button">
                                        <FormattedMessage id={'button_forgot_password'} />
                                    </Button>
                                </Link>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </DefaultLayout>
    );
};

export default Login;
