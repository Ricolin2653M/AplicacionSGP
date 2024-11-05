import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
});

export default model('TypeExpense', userSchema);