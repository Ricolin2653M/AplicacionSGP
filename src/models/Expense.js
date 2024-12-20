import { Schema, model } from "mongoose";

const expenseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: { // Relación uno a uno
        type: Schema.Types.ObjectId,
        ref: 'TypeExpense',
        required: true,
    },
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

export default model('Expense', expenseSchema);
