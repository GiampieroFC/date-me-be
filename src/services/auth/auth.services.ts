// import z from "zod";
import { SenderModel } from '../../data/mongodb/models/sender.mongo';
import { EnsurePassword } from '../../config/ensurePassword';
import { SenderToLogin, SenderToRegister } from '../../types';
import { SenderEntity } from '../../domain/entities/sender.entities';
import { SenderMapper } from '../../mappers/sender.mapper';

export class AuthServices {

    static register = async ({ email, name, password, provider, confirmed }: SenderToRegister): Promise<SenderEntity> => {
        const sender = await SenderModel.create({
            name,
            email,
            provider,
            confirmed,
            password: EnsurePassword.hash(password)
        });
        sender.save();
        return SenderMapper.senderEntityFromObject(sender);
    };

    static login = async ({ email, password }: SenderToLogin): Promise<SenderEntity> => {
        const logged = await SenderModel.findOne({ email });
        if (!logged || !EnsurePassword.compare(password, logged.password)) {
            throw new Error('📛 Email or password incorrect');
        }
        return SenderMapper.senderEntityFromObject(logged);
    };

}