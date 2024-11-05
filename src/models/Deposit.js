import { Schema, model } from "mongoose";

const userSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: [{
        type: Schema.Types.ObjectId,
        ref: 'TypeDeposit'
    }],
    idUser: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

}, {
    timestamps: true,
    versionKey: false
});

export default model('Deposit', userSchema);