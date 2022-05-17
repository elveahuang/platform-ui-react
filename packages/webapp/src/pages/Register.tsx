import React, { FC, useState } from 'react';
import { Button, Card, Col, Form, Input, Row, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import { Store, ValidateErrorEntity } from 'rc-field-form/lib/interface';
//
import './Login.scss';
//
import { DefaultLayout } from '@/layouts';
import { UserService } from '@commons/services';
import { ApiResponse } from '@commons/types';
import { handleRemoteValidationError } from '@/utils';

const Register: FC = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = (values: Store) => {
        console.log(values);
        setLoading(true);
        const data = {
            username: values.username,
            password: values.password,
        };
        UserService.register(data)
            .then(async (resp: ApiResponse) => {
                if (resp.code === 1) {
                    navigate('/login', { replace: true });
                } else {
                    handleRemoteValidationError(form, resp.data);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onFinishFailed = (e: ValidateErrorEntity) => {
        console.log(e);
    };

    return (
        <DefaultLayout>
            <Row justify="center" align="middle" className={'login-container'}>
                <Col span={6}>
                    <Card className={'login-card'} title={intl.formatMessage({ id: 'user_page_register_title' })}>
                        <Form form={form} className={'login-form'} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                            <Form.Item
                                name="username"
                                initialValue="admin"
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
                                initialValue="admin"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input.Password
                                    size="large"
                                    prefix={<UserOutlined />}
                                    placeholder={intl.formatMessage({ id: 'user_field_password' })}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button block type="primary" htmlType="submit" loading={loading}>
                                    <FormattedMessage id={'button_submit'} />
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Link to="/login">
                                    <Button type="link" htmlType="button">
                                        <FormattedMessage id={'button_login'} />
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

export default Register;
