export class RecipientEntities {
    constructor(
        public id: string,
        public sender: string,
        public name: string,
        public deleted: boolean,
        public createdAt: string,
        public updatedAt: string,
    ) { }
}