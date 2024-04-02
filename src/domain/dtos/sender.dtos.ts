import { z } from "zod";
import { SenderToLogin, SenderToRegister } from '../../types';


export class SenderDto {

    static register = (name: string, email: string, password: string, provider?: string, confirmed?: string): SenderToRegister => {
        return senderToRegister.parse({ name, email, password, provider, confirmed });
    };

    static login = (email: string, password: string): SenderToLogin => {
        return senderToLogin.parse({ email, password });
    };
}

export const senderToRegister = z.object({
    name: z
        .string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string',
        })
        .trim()
        .min(2, {
            message: 'Name must have between 2 and 50 characters'
        })
        .max(50, {
            message: 'Name must have between 2 and 50 characters'
        }),
    email: z
        .string()
        .email({
            message: 'Invalid email address'
        }),
    password: z
        .string()
        .min(4, {
            message: 'password must be more than 4 characters'
        }),
    provider: z
        .string({
            invalid_type_error: 'Name must be a string',
        })
        .default('local'),
    confirmed: z
        .boolean()
        .default(false),
});

export const senderToLogin = z.object({
    email: z
        .string()
        .email({
            message: 'Invalid email address'
        }),
    password: z
        .string()
        .min(4, {
            message: 'password must be more than 4 characters'
        }),
});