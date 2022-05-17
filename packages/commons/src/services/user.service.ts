import { get, post, postJson } from '../utils/http';
import { getRefreshToken } from '@commons/utils/storage';
import { Credentials } from '@commons/types/user';

/**
 * 用户登录
 */
export const auth = (credentials: Credentials) => {
    return post('/api/auth/token', credentials);
};
/**
 * 刷新凭证
 */
export const refresh = () => {
    const credentials: Credentials = {
        grant_type: 'refresh_token',
        refresh_token: getRefreshToken(),
    };
    return post('/api/auth/token', credentials);
};
/**
 * 用户退出登录
 */
export const logout = (accessToken: string) => {
    return get('/api/logout', {
        accessToken: accessToken,
    });
};
/**
 * 获取用户信息
 */
export const user = () => {
    return get('/api/user');
};
/**
 * 用户注册
 */
export const register = (params = {}) => {
    return postJson('/api/register', params);
};
/**
 * 获取登录账号个人信息
 */
export const profile = () => {
    return post('/api/user/profile');
};
/**
 * 用户服务
 */
const UserService = {
    auth,
    refresh,
    logout,
    user,
    register,
    profile,
};
export default UserService;
