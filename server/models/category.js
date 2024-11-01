const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: { type: String, required: true },
    sortOrder: Number,
    description: { type: String },
    copy: { type: String },
    icon: {type: String },
}, {
    timestamps: true
})

module.exports = mongoose.model('Category', categorySchema)
