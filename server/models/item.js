const mongoose = require('mongoose')
// this model pointing toward model ensures that Category model is processed by mongoose
require('./category')

const itemSchema = require('./itemSchema')

module.exports = mongoose.model('Item', itemSchema)
