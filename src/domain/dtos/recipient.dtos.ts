import { z } from "zod";
import { CreateRecipient } from '../../types';


export class RecipientDto {

    static create = (sender: string, name: string): CreateRecipient => {
        return createRecipient.parse({ sender, name });
    };
}

export const createRecipient = z.object({
    sender: z.string(),
    name: z.string().min(2).max(50).trim(),
});