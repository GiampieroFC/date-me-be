import { Router } from "express";
import { ProposalControllers } from '../controllers/proposal.controllers';
import { authMiddlewares } from '../../../middlewares/auth.middlewares';

const ProposalRoutes = Router();

ProposalRoutes.get('/', authMiddlewares, ProposalControllers.getAll);

ProposalRoutes.post('/create', authMiddlewares, ProposalControllers.create);

ProposalRoutes.put('/:id/yes', ProposalControllers.addYes);

ProposalRoutes.put('/:id/no', ProposalControllers.addNo);

ProposalRoutes.get('/:id', ProposalControllers.getById);


ProposalRoutes.delete('/delete/:id', authMiddlewares, ProposalControllers.deleteId);

export {
    ProposalRoutes,
};