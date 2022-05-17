export interface Principal {
    /**
     * ID
     */
    id: number;
    /**
     * 用户名
     */
    username: string;
    /**
     * 昵称
     */
    nickname: string;
    /**
     * 角色
     */
    roles: string[];
    /**
     * 权限
     */
    authorities: string[];
}

/**
 * 用户喜好
 */
export interface Preference {
    /**
     * 当前语言
     */
    locale: string;
    /**
     * 当前主题
     */
    theme: {
        /**
         * 是否启用暗黑模式
         */
        dark: boolean;
    };
    /**
     * 左边导航侧边栏
     */
    sidebar: {
        /**
         * 是否收起
         */
        show: boolean;
        /**
         * 小型化
         */
        mini: boolean;
    };
    /**
     * 右边控制侧边栏
     */
    controlSidebar: {
        /**
         * 是否收起
         */
        show: boolean;
        /**
         * 小型化
         */
        mini: boolean;
    };
}

/**
 * Credentials
 */
export interface Credentials {
    /**
     * 类型
     */
    grant_type?: string;
    /**
     * 刷新凭证
     */
    refresh_token?: string;
    /**
     * 用户名
     */
    username?: string;
    /**
     * 密码
     */
    password?: string;
    /**
     *
     */
    client_id?: string;
    /**
     *
     */
    client_secret?: string;
    /**
     *
     */
    clientVersion?: string;
}

/**
 * UserRegister
 */
export interface UserRegister {
    /**
     * 用户名
     */
    username?: string;
    /**
     * 密码
     */
    password?: string;
}
