const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String },
        password: { type: String },
        homeAddress: { type: String },
        phoneNumber: { type: Number, default: 1111111111 },
        dailyCalories: { type: Number },
        googleID: { type: String, default: "" },
        age: { type: Number },
        orders: [
            {
                type: Schema.Types.ObjectId,
                ref: "order", // Reference to the order model
            },
        ],
        goals: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
        preferences: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
        sensitivities: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
        servings: { type: Number, default: 1 },
        deliveriesPerWeek: { type: Number, default: 1 },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
