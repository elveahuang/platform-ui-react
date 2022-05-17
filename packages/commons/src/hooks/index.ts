import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '@commons/store';

/**
 * 仅用于公共组件
 */
export const useBaseDispatch = () => useDispatch<RootDispatch>();

/**
 * 仅用于公共组件
 */
export const useBaseSelector = <T = never>(selector: (state: RootState) => T): T => {
    return useSelector(selector);
};
