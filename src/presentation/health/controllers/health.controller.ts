import { Request, Response } from 'express';

export class HealthController {

    static health = (req: Request, res: Response) => {
        res.status(200).json({
            ok: true,
            answer_at: new Date().toLocaleString(),
        });
    };

}