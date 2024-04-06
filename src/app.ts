import { config } from "dotenv";
config();

import { Logs } from './config/logs';
import { connectMongo } from './data/mongodb/mongo.database';
import { Server } from './server';

const serverProps = {
    PORT: process.env.PORT || 3000,
    logs: Logs.Short
};

const server = new Server(serverProps);

(async () => {

    await connectMongo();

    server.listen();

})();
