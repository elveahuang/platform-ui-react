import React, { FC, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import zhCnProvider from 'antd/lib/locale-provider/zh_CN';
import zhTwProvider from 'antd/lib/locale-provider/zh_TW';
import enUsProvider from 'antd/lib/locale-provider/en_US';
import { LangType } from '@commons/utils/i18n';
import { useBaseSelector } from '@commons/hooks';
import { useMount } from 'ahooks';
import themes, { defaultTheme, ThemeType } from '@commons/utils/theme';

export const antdLocalProvider = {
    [LangType.ZH_CN]: zhCnProvider,
    [LangType.ZH_TW]: zhTwProvider,
    [LangType.EN_US]: enUsProvider,
};

export const AntdConfigProvider: FC = ({ children }) => {
    const { direction, lang, theme } = useBaseSelector((state) => state.app);

    useMount(() => {
        changeAntdTheme();
    });

    useEffect(() => {
        changeAntdTheme(theme);
    });

    return (
        <ConfigProvider direction={direction} locale={antdLocalProvider[lang]}>
            {children}
        </ConfigProvider>
    );
};

/**
 * 修改主题
 */
export const changeAntdTheme = (theme: ThemeType = defaultTheme) => {
    const t = themes.find((element) => element.key === theme);
    ConfigProvider.config({
        theme: {
            primaryColor: t.primaryColor,
            successColor: t.successColor,
            warningColor: t.warningColor,
            errorColor: t.errorColor,
            infoColor: t.infoColor,
            processingColor: t.processingColor,
        },
    });
};
