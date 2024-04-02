import { SenderEntity } from '../domain/entities/sender.entities';

export class SenderMapper {

    static senderEntityFromObject = (obj: Record<string, any>): SenderEntity => {

        const { _id, name, email, password, createdAt, updatedAt, deleted, confirmed, provider, ...others } = obj;

        if (!_id) throw new Error('Missing id');
        if (!name) throw new Error('Missing name');
        if (!email) throw new Error('Missing email');
        if (!password) throw new Error('Missing password');
        if (!createdAt) throw new Error('Missing createdAt');
        if (!updatedAt) throw new Error('Missing updateAt');
        if (typeof deleted !== 'boolean') throw new Error('Missing deleted');
        if (typeof confirmed !== 'boolean') throw new Error('Missing confirmed');

        return new SenderEntity(
            _id,
            name,
            email,
            password,
            createdAt,
            updatedAt,
            deleted,
            confirmed,
            provider
        );
    };

}