export class ProposalEntity {

    constructor(
        public id: string,
        public sender: string,
        public recipient: string,
        public isAnswered: boolean,
        public message: string,
        public question: string,
        public deleted: boolean,
        public createdAt: string,
        public updatedAt: string,
        public answer: Answer,
        public background?: string,
        public gif?: string,
    ) { }

};

type Answer = {
    yes: number;
    no: number;
};