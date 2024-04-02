import { z } from 'zod';
import { senderToLogin, senderToRegister } from './domain/dtos/sender.dtos';
import { createProposal } from './domain/dtos/proposal.dtos';
import { createRecipient } from './domain/dtos/recipient.dtos';

export type SenderToRegister = z.infer<typeof senderToRegister>;
export type SenderToLogin = z.infer<typeof senderToLogin>;
export type CreateProposal = z.infer<typeof createProposal>;
export type CreateRecipient = z.infer<typeof createRecipient>;

declare global {
    namespace Express {
        interface Request {
            local: {
                sender: {
                    id: string;
                };
            };
        }
    }
}