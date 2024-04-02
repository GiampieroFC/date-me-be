export class SenderEntity {

    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public createdAt: string,
        public updatedAt: string,
        public deleted: boolean,
        public confirmed: boolean,
        public provider?: string,
    ) { }

}