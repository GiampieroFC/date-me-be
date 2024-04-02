import { Schema, model } from "mongoose";

const senderSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    },
    password: {
        type: String,
        required: true,
        minLength: 4
    },
    provider: {
        type: String,
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true },
);

export const SenderModel = model("Sender", senderSchema);