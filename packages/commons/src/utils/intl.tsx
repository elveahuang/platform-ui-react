import React, { FC, useCallback, useRef, useState } from 'react';
import { useBaseSelector } from '@commons/hooks';
import { IntlShape, RawIntlProvider } from 'react-intl';
import { createReactIntl, LangType } from '@commons/utils/i18n';
import { useMount, useUpdateEffect } from 'ahooks';

export const AppIntlProvider: FC = ({ children }) => {
    const lang = useBaseSelector((state) => state.app.lang);
    const [value, setValue] = useState<IntlShape>();
    const cache = useRef<Partial<Record<LangType, boolean>>>({});
    const updateIntl = useCallback(() => {
        createReactIntl(lang).then((curIntl) => {
            cache.current[lang] = true;
            setValue(curIntl);
        });
    }, [lang]);
    //
    useMount(() => {
        updateIntl();
    });
    //
    useUpdateEffect(() => {
        updateIntl();
    }, [updateIntl]);

    return value ? <RawIntlProvider value={value}>{children}</RawIntlProvider> : <></>;
};
