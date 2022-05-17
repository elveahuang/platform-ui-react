/**
 * 主题类型
 */
export type Theme = {
    key: ThemeType;
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor: string;
    //
    successColor?: string;
    infoColor?: string;
    processingColor?: string;
    warningColor?: string;
    errorColor?: string;
};

/**
 * 主题枚举
 */
export enum ThemeType {
    BLUE,
    BLACK,
    GREEN,
    PURPLE,
    RED,
    YELLOW,
}

/**
 * 对齐方式枚举
 */
export enum DirectionType {
    LTR = 'ltr',
    RTL = 'rtl',
}

/**
 * 默认主题
 */
export const defaultTheme = ThemeType.BLUE;

/**
 * 内置主题
 */
export const themes: Array<Theme> = [
    {
        key: ThemeType.BLUE,
        primaryColor: '#1890ff',
        secondaryColor: 'blue',
        tertiaryColor: 'blue',
    },
    {
        key: ThemeType.GREEN,
        primaryColor: '#00a65a',
        secondaryColor: 'red',
        tertiaryColor: 'red',
    },
    {
        key: ThemeType.BLACK,
        primaryColor: '#222d32',
        secondaryColor: 'green',
        tertiaryColor: 'green',
    },
    {
        key: ThemeType.PURPLE,
        primaryColor: '#605ca8',
        secondaryColor: 'blue',
        tertiaryColor: 'blue',
    },
    {
        key: ThemeType.RED,
        primaryColor: '#dd4b39',
        secondaryColor: 'blue',
        tertiaryColor: 'blue',
    },
    {
        key: ThemeType.YELLOW,
        primaryColor: '#f39c12',
        secondaryColor: 'blue',
        tertiaryColor: 'blue',
    },
];

/**
 * 切换主题
 */
export const changeTheme = (theme: ThemeType = defaultTheme) => {
    const t = themes.find((element) => element.key === theme);
    document.body.style.setProperty('--primary-color', t.primaryColor);
    document.body.style.setProperty('--secondary-color', t.secondaryColor);
};

/**
 * 初始主题
 */
export const setupTheme = (theme: ThemeType = defaultTheme) => {
    changeTheme(theme);
};

export default themes;
