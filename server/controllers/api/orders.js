const Order = require("../../models/order");

module.exports = {
	cart,
	addToCart,
	setItemQtyInCart,
	checkout,
	history,
	removeFromCart,
	updateCartItem,
    updateServings
};

// a cart : the unpaid order for a user
async function cart(req, res) {
    try {
        const cart = await Order.getCart(req.user.id)
        res.status(200).json(cart)
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
}

// Add an item to the cart
async function addToCart(req, res) {
    try {
        const cart = await Order.getCart(req.user.id)
        await cart.addItemToCart(req.params.id)
        res.status(200).json(cart)
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
}

// Updates an item's qty in the cart
async function setItemQtyInCart(req, res) {
    try {
        const cart = await Order.getCart(req.user.id)
        await cart.setItemQty(req.body.itemId, req.body.newQty)
        res.status(200).json(cart)
    } catch (e) {
        res.status(400).json({ msg: e.message })
        }
    }

    // update the cart's isPaid property to true
    async function checkout(req, res) {
        try {
            const cart = await Order.getCart(req.user.id)
            cart.isPaid = true
            await cart.save()
            res.status(200).json(cart)
        } catch (e) {
            res.status(400).json({ msg: e.message })
        }
    }

    // return the logged in user's paid order history
    async function history(req, res) {
        // sort the most RECENT orders first
        try {
            const orders = await Order
            .find({ user: req.user.id, isPaid: true })
            .sort('-updatedAt').exec()
            res.status(200).json(orders)
        } catch(e) {
            res.status(400).json({ msg: e.message })
        }
    }

// Remove an item from the cart
async function removeFromCart(req, res) {
	try {
		const cart = await Order.getCart(req.user.id);
		cart.lineItems = cart.lineItems.filter(
			(item) => !item.item.id.equals(req.params.id)
		);
		await cart.save();
		res.status(200).json(cart);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
}

// Update an item in the cart
async function updateCartItem(req, res) {
	try {
		const cart = await Order.getCart(req.user.id);
		const item = cart.lineItems.find((item) =>
			item.item.id.equals(req.params.id)
		);
		if (item) {
			item.qty = req.body.qty || item.qty;
			// Update other properties as needed
		}
		await cart.save();
		res.status(200).json(cart);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
}

// Update servings and deliveriesPerWeek
async function updateServings(req, res) {
    try {
        // Retrieve the cart associated with the user
        const cart = await Order.getCart(req.user.id);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Update the cart with the new values
        cart.servings = req.body.servings;
        cart.deliveriesPerWeek = req.body.deliveriesPerWeek;

        // Save the updated cart back to the database
        await cart.save();

        // Send the updated cart as the response
        res.status(200).json(cart);
    } catch (e) {
        // Handle any errors that occurred during the process
        res.status(400).json({ message: e.message });
    }
}
