import { z } from "zod";
import { CreateProposal } from '../../types';


export class ProposalDto {

    static create = (sender: string, recipient: string, message: string, question: string): CreateProposal => {
        return createProposal.parse({ sender, recipient, message, question });
    };

}

export const createProposal = z.object({
    sender: z.string(),
    recipient: z.string().min(2).max(50).trim(),
    answer: z.object({
        yes: z.number().int().nonnegative(),
        no: z.number().int().nonnegative(),
    }).default({ yes: 0, no: 0 }),
    isAnswered: z.boolean().default(false),
    message: z.string().max(800).trim(),
    question: z.string().max(90).trim(),
    gif: z.string().optional(),
    background: z.string().optional(),
});