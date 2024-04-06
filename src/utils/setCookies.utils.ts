import { CookieOptions } from 'express';

export const setCookies = (token: string): [name: string, val: string, options: CookieOptions] => [
    process.env.TOKEN_NAME!,
    token,
    {
        sameSite: process.env.MODE === process.env.PRODUCTION ? 'none' : undefined,
        priority: 'high',
        maxAge: 172800000,
        httpOnly: true,
        secure: process.env.MODE === process.env.PRODUCTION
    }
];