import { sign, verify } from 'jsonwebtoken';

const signature = process.env.JWT_SIGN!;

export class Token {

    static new = (data: Record<string, any>, expiresIn = '2d') => sign(data, signature, { expiresIn });

    static validate = (token: string) => {
        const isProper = verify(token, signature);
        if (!isProper) throw Error('📛 Invalid token');
        return isProper;
    };

    static refresh = (token: string) => {
        const isProper = this.validate(token);
        if (!isProper) throw new Error('📛 We can\'t refresh invalid token');
        if (!!isProper) {
            const { id, email, ...rest } = isProper as Record<string, any>;

            return this.new({ id, email });
        }
    };
};