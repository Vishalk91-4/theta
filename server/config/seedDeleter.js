require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)

mongoose.connection.once('open', () => {
    console.log('So Fresh and so Clean-Clean!')
})


const Category = require('../models/category');
const Item = require('../models/item');
const User = require('../models/user')
const Order = require('../models/order')

const seedDeleter = async () => {
    await User.deleteMany({})
    await Category.deleteMany({})
    await Item.deleteMany({})
    await Order.deleteMany({})
    process.exit()
}

    seedDeleter()
