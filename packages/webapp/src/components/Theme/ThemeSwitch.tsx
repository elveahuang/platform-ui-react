import React, { FC } from 'react';
import { themes } from '@commons/utils/theme';
import { Button } from 'antd';
import { useBaseDispatch } from '@commons/hooks';
import { changeTheme } from '@commons/store/app';

const ThemeSwitch: FC = () => {
    const dispatch = useBaseDispatch();
    return (
        <>
            {themes.map((theme) => {
                return (
                    <Button
                        key={theme.key}
                        style={{ backgroundColor: theme.primaryColor, width: 80 }}
                        onClick={() => {
                            dispatch(changeTheme(theme.key));
                        }}
                    >
                        {theme.key}
                    </Button>
                );
            })}
        </>
    );
};

export default ThemeSwitch;
