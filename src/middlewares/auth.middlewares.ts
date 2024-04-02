import { NextFunction, Request, Response } from 'express';
import { Token } from '../config/token';
import { SenderModel } from '../data/mongodb/models/sender.mongo';
import { ZodError } from 'zod';


export const authMiddlewares = async (req: Request, res: Response, next: NextFunction) => {

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

        req.local = {
            sender: {
                id: sender.id
            }
        };

        next();
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
        console.trace(msg);
    }

};
