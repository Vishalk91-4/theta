const mongoose = require('mongoose')
const Schema = mongoose.Schema
const itemSchema = require('./itemSchema')

const lineItemSchema = new Schema({
    qty: { type: Number, default: 1 },
    item: itemSchema
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

lineItemSchema.virtual('extPrice').get(function() {
    const cart = this.ownerDocument();
    // this is bound to the lineItemSchema sub document
    return this.qty * this.item.price * cart.servings
})

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    lineItems: [lineItemSchema],
    isPaid: { type: Boolean, default: false },
    servings: { type: Number, default: 1},
    deliveriesPerWeek: { type: Number, default: 1},
    tax: { type: Number, default: 10.99},
    shipping: { type: Number, default: 10.99}
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

orderSchema.virtual('orderTotal').get(function() {
    return this.lineItems.reduce((total, item) => total + (item.extPrice * this.deliveriesPerWeek), this.tax + this.shipping)
})

orderSchema.virtual('totalQty').get(function() {
    return this.lineItems.reduce((total, item) => total + item.qty, 0)
})

orderSchema.virtual('orderId').get((function() {
    return this.id.slice(-6).toUpperCase()
}))

orderSchema.statics.getCart = function(userId) {
    // true 'order' model below
    return this.findOneAndUpdate(
        { user: userId, isPaid: false },
        // update
        { user: userId},
        // create doc if it doesn't exist using upsert
        { upsert: true, new: true }
    )
}

orderSchema.methods.addItemToCart = async function(itemId) {
    const cart = this
    // check if an item is in the cart already
    const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId))
    if (lineItem) {
        lineItem.qty += 1
    } else {
        const item = await mongoose.model('Item').findById(itemId)
        cart.lineItems.push({ item })
    }
    return cart.save()
}

// The instance method will set an item's quantity in the cart. -> add the item if it doesn't exist
orderSchema.methods.setItemQty = function(itemId, newQty) {
    // this keyword is bound to the cart (order doc)
    const cart = this
    // find the line item in the cart for the menu item
    const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId))
    if (lineItem && newQty <= 0) {
        // call remove, remove itself from the cart.lineItems array
        lineItem.deleteOne()
    } else if (lineItem) {
        // set the new qty - positive value assured due to if statement above
        lineItem.qty = newQty
    }
    // return the save() method's promise
    return cart.save()
}

module.exports = mongoose.model('Order', orderSchema)
