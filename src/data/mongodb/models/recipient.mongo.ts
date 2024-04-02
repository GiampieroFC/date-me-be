import { Schema, model } from "mongoose";

enum Gender {
    he = 'he',
    she = 'she',
};

const recipientSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'Sender',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxlength: 50
    },
    // gender: {
    //     type: String,
    //     enum: Gender,
    //     required: true
    // },
    email: {
        type: String,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    },
    instagram: {
        type: String
    },
    phone: {
        type: String,
        match: /^\+(?:[0-9] ?){6,14}[0-9]$/,
    },
    deleted: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true },
);

export const RecipientModel = model("Recipient", recipientSchema);