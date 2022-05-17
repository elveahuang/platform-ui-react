export class ApiResponse<T = any> {
    static readonly CODE_SUCCESS: number = 1;
    static readonly CODE_ERROR: number = 0;
    code!: number;
    message!: string;
    data!: T;
}

export interface ApiAuthTokenResult {
    access_token: string;
    refresh_token: string;
}

export interface Menu {
    /**
     * 菜单标识
     */
    key: string;
    /**
     * 菜单多语言文本
     */
    label: string;
    /**
     * 菜单图标
     */
    icon: string;
    /**
     * 菜单链接
     */
    link?: string;
    /**
     * 菜单是否需要检查权限
     */
    authenticated?: boolean;
    /**
     * 菜单对应权限
     */
    authorities?: string | string[] | null | undefined;
    /**
     * 子菜单
     */
    items?: Menu[];
}
