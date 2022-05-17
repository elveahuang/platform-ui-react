import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Canceler } from 'axios';
import { isArray, isEmpty, merge } from 'lodash';
import { stringify } from 'qs';
//
import { getAccessToken } from '@commons/utils/storage';
import { ApiResponse } from '@commons/types';
import toast from '@commons/utils/toast';
import environment from '@commons/utils/env';
import { refresh } from '@commons/services/user.service';

/**
 * 取消请求
 */
const CancelToken = axios.CancelToken;
const cancels: Canceler[] = [];
const cancelAllRequest = (message?: string) => {
    cancels.forEach((cancel) => cancel(message));
};
/**
 *
 */
let isRefreshing = false;
const requests: Array<(token: string) => void> = [];
/**
 * 超时判断
 */
const isTimeoutError = (error: AxiosError) => error.code === 'ECONNABORTED' && error.message.includes('timeout');

/**
 * 设置全局参数
 */
axios.defaults.timeout = 300000;
axios.defaults.baseURL = environment.server;
axios.defaults.withCredentials = false;

/**
 * 创建实例
 */
const http = axios.create();

const cancelRequestConfig: AxiosRequestConfig = {
    cancelToken: new CancelToken((cancel) => {
        cancels.push(cancel);
    }),
};

/**
 * Get
 */
const getRequestConfig: AxiosRequestConfig = {
    ...cancelRequestConfig,
};

const get = <R = any, P = any>(url: string, data?: P, config: AxiosRequestConfig = getRequestConfig): Promise<R> => {
    config.params = data;
    return http.get(url, config);
};

/**
 * Post
 */
const postRequestConfig: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: (data: any, headers: any) => {
        console.log('transformRequest...');
        console.log(headers);
        console.log(stringify(data));
        return stringify(data);
    },
    ...cancelRequestConfig,
};

const post = <R = any, P = any>(url: string, data?: P, config: AxiosRequestConfig = postRequestConfig): Promise<R> => {
    return http.post(url, data || {}, config);
};

/**
 * Post Json
 */
const postJsonRequestConfig: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
    transformRequest: (data: any) => {
        return JSON.stringify(data);
    },
    ...cancelRequestConfig,
};

const postJson = <R = any, P = any>(
    url: string,
    data?: P,
    config: AxiosRequestConfig = postJsonRequestConfig,
): Promise<R> => {
    return http.post(url, data || {}, config);
};

/**
 * Post FormBody
 */
const postFormRequestConfig: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...cancelRequestConfig,
};

const postForm = <R = any, P = any>(
    url: string,
    data?: P,
    config: AxiosRequestConfig = postFormRequestConfig,
): Promise<R> => {
    return http.post(url, data || {}, config);
};

/**
 * Post Multipart
 */
const postMultipartRequestConfig: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    ...cancelRequestConfig,
};

const postMultipart = <R = any, P = any>(
    url: string,
    data?: P,
    config: AxiosRequestConfig = postMultipartRequestConfig,
): Promise<R> => {
    return http.post(url, data || {}, config);
};

/**
 * Xdebug Interceptor
 */
const setupDebugInterceptor = () => {
    http.interceptors.request.use(async (config: AxiosRequestConfig) => {
        if (environment.xdebug.enabled) {
            if (config.params) {
                if (isArray(config.params)) {
                    config.params = merge(config.params, {
                        XDEBUG_SESSION_START: environment.xdebug.key,
                    });
                }
            } else {
                config.params = {
                    XDEBUG_SESSION_START: environment.xdebug.key,
                };
            }
            console.log(`xdebug enabled - ${environment.xdebug.enabled}`);
        }
        return config;
    });
};

/**
 * Authorization
 */
const setupAuthorizationInterceptor = () => {
    http.interceptors.request.use(async (config: AxiosRequestConfig) => {
        const token = getAccessToken();
        console.log(`token - ${token}`);
        if (isEmpty(token)) {
        } else {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`Authorization ${config.headers.Authorization}`);
        return config;
    });
};

/**
 * Response
 */
const setupResponseInterceptor = () => {
    http.interceptors.response.use(
        (response: AxiosResponse) => {
            if (response.status === 200 && response.data.code !== ApiResponse.CODE_SUCCESS) {
                toast(response.data.message);
            }
            return response.data;
        },
        (error: AxiosError) => {
            if (error.response) {
                const response = error.response as AxiosResponse;
                switch (response.status) {
                    case 404:
                        toast('接口不存在');
                        break;
                    case 401:
                        // eslint-disable-next-line no-case-declarations
                        const originalConfig = response.config;
                        if (isRefreshing) {
                            return new Promise((resolve) => {
                                requests.push((token: string) => {
                                    originalConfig.headers.Authorization = 'Bearer ' + token;
                                    resolve(http(originalConfig));
                                });
                            });
                        }
                        isRefreshing = true;
                        return refresh()
                            .then(() => {
                                const token = getAccessToken();
                                originalConfig.headers.Authorization = 'Bearer ' + token;
                                requests.forEach((resolve) => resolve(token));
                                return http(originalConfig);
                            })
                            .catch(() => {
                                toast('凭证已过期');
                            })
                            .finally(() => {
                                isRefreshing = false;
                            });
                    case 503:
                        toast('请稍后再试');
                        break;
                    default:
                        break;
                }
            } else {
                if (isTimeoutError(error)) {
                    toast('网络连接超时');
                } else {
                    toast('网络好像出了点问题,请稍后再试');
                }
            }
            return Promise.reject(error);
        },
    );
};

/**
 * 默认设置
 */
const setupHttp = () => {
    setupDebugInterceptor();
    setupAuthorizationInterceptor();
    setupResponseInterceptor();
};

export default http;

export { axios, isTimeoutError, get, post, postForm, postJson, postMultipart };

export {
    getRequestConfig,
    postRequestConfig,
    postFormRequestConfig,
    postJsonRequestConfig,
    postMultipartRequestConfig,
};

export { setupHttp, setupDebugInterceptor, setupAuthorizationInterceptor, setupResponseInterceptor };

export { cancelAllRequest, cancels, CancelToken };
