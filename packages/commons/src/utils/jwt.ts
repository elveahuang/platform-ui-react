import { Principal } from '@commons/types/user';
import { decode } from 'jsonwebtoken';

/**
 * JwtPayload
 */
export interface JwtPayload {
    /**
     * ID
     */
    readonly id: string;
    /**
     * EXP
     */
    readonly exp: number;
    /**
     * 用户凭证
     */
    readonly principal: Principal;
}

/**
 * 解析凭证
 */
export const parseJwtToken = (token: string): JwtPayload | null => {
    if (token) {
        const payload: JwtPayload = decode(token) as JwtPayload;
        if (payload) {
            return payload;
        }
    }
    return null;
};
