import { ProposalEntity } from '../domain/entities/proposal.entities';

export class ProposalMapper {

    static senderEntityFromObject = (obj: Record<string, any>): ProposalEntity => {

        const { _id, sender, recipient, isAnswered, message, question, answer, createdAt, updatedAt, deleted, ...others } = obj;

        if (!_id) throw new Error('Missing id');
        if (!sender) throw new Error('Missing sender');
        if (!recipient) throw new Error('Missing recipient');
        if (!isAnswered) throw new Error('Missing isAnswered');
        if (!message) throw new Error('Missing message');
        if (!question) throw new Error('Missing question');
        if (!answer) throw new Error('Missing answer');
        if (!createdAt) throw new Error('Missing createdAt');
        if (!updatedAt) throw new Error('Missing updateAt');
        if (typeof deleted !== 'boolean') throw new Error('Missing deleted');

        return new ProposalEntity(
            _id,
            sender,
            recipient,
            isAnswered,
            message,
            question,
            deleted,
            createdAt,
            updatedAt,
            answer,
        );
    };

}