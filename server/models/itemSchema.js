const Schema = require('mongoose').Schema

const itemSchema = new Schema({
    name: { type: String, required: true},
    image: String,
    category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    price: Number,
    description: { type: String },
//    dietaryCategory: { type: Schema.Types.ObjectId, ref: 'Category' }, // This may need updating as we evolve
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true }
}, {
    timestamps: true
})

module.exports = itemSchema
