import { Schema, model } from "mongoose";

const proposalSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'Sender',
        required: true
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'Recipient',
        required: true
    },
    answer: {
        yes: { type: Number, default: 0 },
        no: { type: Number, default: 0 }
    },
    isAnswered: {
        type: Boolean,
    },
    message: {
        type: String,
        required: true,
        maxlength: 800
    },
    question: {
        type: String,
        required: true,
        maxlength: 90
    },
    gif: {
        type: String,
    },
    background: {
        type: String,
    },
    deleted: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true },
);

export const ProposalModel = model("Proposal", proposalSchema);