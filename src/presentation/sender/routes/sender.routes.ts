import { Router } from "express";
import { SenderControllers } from '../controllers/sender.controllers';

const senderAuthRoutes = Router();

senderAuthRoutes.get('/', SenderControllers.isLogged);

senderAuthRoutes.post('/register', SenderControllers.register);

senderAuthRoutes.post('/login', SenderControllers.login);

senderAuthRoutes.get('/logout', SenderControllers.logout);

export {
    senderAuthRoutes,
};