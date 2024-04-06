import { CookieOptions } from 'express';

export const clearCookies = (): [name: string, options?: CookieOptions] => [
    process.env.TOKEN_NAME!,
    {
        sameSite: process.env.MODE === process.env.PRODUCTION ? 'none' : undefined,
        priority: 'high',
        httpOnly: true,
        secure: process.env.MODE === process.env.PRODUCTION
    }
];