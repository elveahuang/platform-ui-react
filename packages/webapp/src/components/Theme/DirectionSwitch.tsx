import React, { FC } from 'react';
import { DirectionType } from '@commons/utils/theme';
import { Button } from 'antd';
import { useBaseDispatch } from '@commons/hooks';
import { changeDirection } from '@commons/store/app';

const DirectionSwitch: FC = () => {
    const dispatch = useBaseDispatch();
    return (
        <>
            <Button
                onClick={(e) => {
                    e.preventDefault();
                    dispatch(changeDirection(DirectionType.LTR));
                }}
            >
                LTR
            </Button>

            <Button
                onClick={(e) => {
                    e.preventDefault();
                    dispatch(changeDirection(DirectionType.RTL));
                }}
            >
                RTL
            </Button>
        </>
    );
};

export default DirectionSwitch;
