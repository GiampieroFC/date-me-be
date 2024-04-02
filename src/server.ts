import express from "express";
import { senderAuthRoutes } from './presentation/sender/routes/sender.routes.js';
import { Logs, logger } from './config/logs.js';
import cookieParser from "cookie-parser";
import { healthRoute } from './presentation/health/routes/health.route.js';
import cors from 'cors';
import { ProposalRoutes } from './presentation/proposal/routes/proposal.routes.js';

interface ServerProps {
    PORT: number | string;
    logs: Logs;
}

export class Server {

    private app;
    readonly port;
    public logs;

    constructor({ PORT, logs }: ServerProps) {
        this.app = express();
        this.port = PORT;
        this.logs = logs;
    }

    middlewares = () => {
        this.app.use(cors({
            credentials: true,
            origin: [
                process.env.FRONTEND_URL!,
                "http://localhost:5173",
                "http://192.168.0.14:5173",
                "http://172.19.0.1:5173",
            ]
        }));
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(logger(this.logs));

    };

    routes = () => {

        // Health route
        this.app.use('/api/v1', healthRoute);

        // Sender routes
        this.app.use('/api/v1/sender', senderAuthRoutes);
        this.app.use('/api/v1/sender/auth', senderAuthRoutes);

        // Recipient routes
        this.app.use('/api/v1/recipient', () => { });

        // Proposal routes
        this.app.use('/api/v1/proposal', ProposalRoutes);
    };

    listen = () => {
        this.middlewares();
        this.routes();
        this.app.listen(this.port, () => { console.log(`👂 http://localhost:${this.port}`); });
    };
}