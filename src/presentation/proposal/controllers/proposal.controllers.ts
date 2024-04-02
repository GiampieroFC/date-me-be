import { Request, Response } from 'express';
import { ProposalDto } from '../../../domain/dtos/proposal.dtos';
import { ZodError } from 'zod';
import { ProposalModel } from '../../../data/mongodb/models/proposal.mongo';
import { RecipientDto } from '../../../domain/dtos/recipient.dtos';
import { RecipientModel } from '../../../data/mongodb/models/recipient.mongo';

export class ProposalControllers {

    static create = async (req: Request, res: Response) => {

        const { name, message, question } = req.body;
        const senderId = req.local.sender.id;

        console.log("local", req.local);

        try {

            const validatedRecipient = RecipientDto.create(senderId, name);
            const recipientCreated = await RecipientModel.create(validatedRecipient);
            recipientCreated.save();

            const validatedProposal = ProposalDto.create(senderId, recipientCreated.id, message, question);
            const proposalCreated = (await ProposalModel.create(validatedProposal));
            proposalCreated.save();

            res.json({
                ok: true,
                msg: "Proposal card created",
                proposal: proposalCreated
            });

        } catch (error) {
            let msg;
            if (error instanceof Error) {
                msg = error.message;
            }
            if (error instanceof ZodError) {
                msg = error.errors.map(e => { return { where: e.path[0], error: e.message }; });
            }
            res.status(404).json({
                ok: false,
                msg
            });
            console.log(msg);
        }
    };

    static getAll = async (req: Request, res: Response) => {

        const senderId = req.local.sender.id;

        console.log("senderId", senderId);

        try {

            const proposals = await ProposalModel.find({ sender: senderId }).populate('recipient', 'name');

            res.json({
                ok: true,
                msg: "All your proposals",
                count: proposals.length,
                proposals: proposals
            });

        } catch (error) {
            let msg;
            if (error instanceof Error) {
                msg = error.message;
            }
            if (error instanceof ZodError) {
                msg = error.errors.map(e => { return { where: e.path[0], error: e.message }; });
            }
            res.status(404).json({
                ok: false,
                msg
            });
            console.log(msg);
        }
    };
    static getById = async (req: Request, res: Response) => {

        const { id } = req.params;

        try {

            const proposal = await ProposalModel.findById(id).populate('recipient', 'name').populate('sender', 'name');

            res.json({
                ok: true,
                msg: "Your proposal",
                proposal
            });

        } catch (error) {
            let msg;
            if (error instanceof Error) {
                msg = error.message;
            }
            if (error instanceof ZodError) {
                msg = error.errors.map(e => { return { where: e.path[0], error: e.message }; });
            }
            res.status(404).json({
                ok: false,
                msg
            });
            console.log(msg);
        }
    };

    static addYes = async (req: Request, res: Response) => {

        const { id } = req.params;

        try {

            const proposalYes = await ProposalModel.findByIdAndUpdate(id, { $inc: { 'answer.yes': 1 }, isAnswered: true }, { new: true });

            res.json({ proposalYes });

        } catch (error) {
            let msg;
            if (error instanceof Error) {
                msg = error.message;
            }
            if (error instanceof ZodError) {
                msg = error.errors.map(e => { return { where: e.path[0], error: e.message }; });
            }
            res.status(404).json({
                ok: false,
                msg
            });
            console.log(msg);
        }
    };

    static addNo = async (req: Request, res: Response) => {

        const { id } = req.params;

        try {

            const proposalNo = await ProposalModel.findByIdAndUpdate(id, { $inc: { 'answer.no': 1 }, isAnswered: true }, { new: true });

            res.json({ proposalNo });

        } catch (error) {
            let msg;
            if (error instanceof Error) {
                msg = error.message;
            }
            if (error instanceof ZodError) {
                msg = error.errors.map(e => { return { where: e.path[0], error: e.message }; });
            }
            res.status(404).json({
                ok: false,
                msg
            });
            console.log(msg);
        }
    };
    static deleteId = async (req: Request, res: Response) => {

        const { id } = req.params;

        try {

            const proposal = await ProposalModel.findByIdAndDelete(id);

            res.json({
                ok: true,
                msg: "Proposal deleted",
                proposal
            });

        } catch (error) {
            let msg;
            if (error instanceof Error) {
                msg = error.message;
            }
            if (error instanceof ZodError) {
                msg = error.errors.map(e => { return { where: e.path[0], error: e.message }; });
            }
            res.status(404).json({
                ok: false,
                msg
            });
            console.log(msg);
        }
    };
}