import { Request, Response } from 'express';
import { Token } from '../../../config/token';
import { AuthServices } from '../../../services/auth/auth.services';
import { SenderDto } from '../../../domain/dtos/sender.dtos';
import { SenderToRegister } from '../../../types';
import { ZodError } from 'zod';
import { SenderModel } from '../../../data/mongodb/models/sender.mongo';
import { setCookies } from '../../../utils/setCookies.utils';
import { clearCookies } from '../../../utils/clearCookies.utils';

export class SenderControllers {

    static isLogged = async (req: Request, res: Response) => {

        console.log(req.cookies);

        const token = req.cookies[process.env.TOKEN_NAME!];

        console.log("Token (isLogged)", token);

        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'Token not found'
            });
        }


        try {
            const { id } = Token.validate(token) as Record<string, any>;

            const sender = await SenderModel.findById(id);

            if (!sender) {
                return res.status(401).json({
                    ok: false,
                    msg: 'Unauthorized'
                });
            }
            res.json({
                ok: true,
                token,
                sender
            });
        } catch (error) {
            let msg;
            if (error instanceof Error) {
                msg = error.message;
            }
            if (error instanceof ZodError) {
                msg = error.errors.map(e => { return { where: e.path[0], error: e.message }; });
            }
            res.status(401).json({
                ok: false,
                msg
            });
            console.log(msg);
        }
    };

    static register = async (req: Request, res: Response) => {

        const { name, email, password } = req.body;
        const validated: SenderToRegister = SenderDto.register(name, email, password);

        try {
            const { id, name, email, confirmed, provider } = await AuthServices.register(validated);
            const token = Token.new({
                id,
                email,
            });
            res.cookie(...setCookies(token)).status(201).json({
                ok: true,
                sender: { id, name, email, confirmed, provider }
            });
        } catch (error) {
            let msg;
            if (error instanceof Error) {
                msg = error.message;
            }
            if (error instanceof ZodError) {
                msg = error.errors.map(e => { return { where: e.path[0], error: e.message }; });
            }
            res.status(401).json({
                ok: false,
                msg
            });
            console.log(msg);
        }
    };

    static login = async (req: Request, res: Response) => {

        // TODO: validar si se ingresa con proveedor o no, si entra con proveedor, obligarlo a entrar con su proveedor <-- importante para la seguridad

        // TODO: validar si la cuenta está eliminada también.

        const { email, password } = req.body;
        const validated = SenderDto.login(email, password);

        try {
            const { id, name, email, confirmed, provider } = await AuthServices.login(validated);
            const token = Token.new({
                id,
                email,
            });
            res.cookie(...setCookies(token)).status(201).json({
                ok: true,
                sender: { id, name, email, confirmed, provider }
            });
        } catch (error) {
            let msg;
            if (error instanceof Error) {
                msg = error.message;
            }
            if (error instanceof ZodError) {
                msg = error.errors.map(e => { return { where: e.path[0], error: e.message }; });
            }
            res.status(400).json({
                ok: false,
                msg
            });
            console.log(msg);
        }
    };

    static logout = async (req: Request, res: Response) => {

        try {
            res.clearCookie(...clearCookies()).status(200).json({
                status: 'logged out'
            });
        } catch (error) {
            let msg;
            if (error instanceof Error) {
                msg = error.message;
            }
            if (error instanceof ZodError) {
                msg = error.errors.map(e => { return { where: e.path[0], error: e.message }; });
            }
            res.status(401).json({
                ok: false,
                msg
            });
            console.log(msg);
        }
    };
};