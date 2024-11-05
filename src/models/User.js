import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

}, {
    timestamps: true,
    versionKey: false
});

export default model('User', userSchema);