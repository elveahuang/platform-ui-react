import { post } from '../utils/http';

/**
 * 搜索用户
 */
export const search = () => {
    return post('/api/user/profile');
};
/**
 * 后台管理用户服务
 */
const UserAdminService = {
    search,
};
export default UserAdminService;
