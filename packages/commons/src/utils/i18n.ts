import { createIntl, createIntlCache, IntlShape } from 'react-intl';

export enum LangType {
    ZH_CN = 'zh-CN',
    ZH_TW = 'zh-TW',
    EN_US = 'en-US',
}

/**
 * 默认语言
 */
export const defaultLang = LangType.ZH_CN;

/**
 * 按需加载多语言文件
 */
const loadMessages: Record<LangType, () => Promise<any>> = {
    [LangType.ZH_CN]: () => import('../locales/zh_CN'),
    [LangType.ZH_TW]: () => import('../locales/zh_TW'),
    [LangType.EN_US]: () => import('../locales/en_US'),
};

const cache = createIntlCache();

let intl: IntlShape;

export const createReactIntl = async (lang: LangType = defaultLang) => {
    const messages = (await loadMessages[lang]().then((i: any) => {
        return i.default || i;
    })) as Record<string, string>;

    intl = createIntl(
        {
            locale: lang,
            messages: messages,
        },
        cache,
    );
    return intl;
};

export { intl };
