import { compareSync, hashSync } from "bcryptjs";

export class EnsurePassword {

    static hash = (password: string): string => {
        const hashed = hashSync(password);
        return hashed;
    };

    static compare = (password: string, passwordFromDB: string): boolean => {
        const isProper = compareSync(password, passwordFromDB);

        return isProper;
    };

}