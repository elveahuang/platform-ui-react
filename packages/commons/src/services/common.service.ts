import { get } from '../utils/http';

/**
 * 初始化
 */
export const initialize = () => {
    return get('/api/initialize');
};
/**
 * 首页
 */
export const home = () => {
    return get('/api/home');
};
/**
 * 公共服务
 */
const CommonService = {
    initialize,
    home,
};
export default CommonService;
