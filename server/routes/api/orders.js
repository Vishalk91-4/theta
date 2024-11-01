const express = require("express");
const router = express.Router();
const ordersCtrl = require("../../controllers/api/orders");
const authMiddleware = require("../../utils/authMiddleware");

// GET /orders/cart
router.get("/cart", authMiddleware.authenticateToken, ordersCtrl.cart);

// GET /orders/history
router.get("/history", authMiddleware.authenticateToken, ordersCtrl.history);

// POST /orders/cart/items/:id
router.post(
	"/cart/items/:id",
	authMiddleware.authenticateToken,
	ordersCtrl.addToCart
);
// POST /orders/cart/checkout
router.post(
	"/cart/checkout",
	authMiddleware.authenticateToken,
	ordersCtrl.checkout
);
// POST /orders/cart/qty
router.put(
	"/cart/qty",
	authMiddleware.authenticateToken,
	ordersCtrl.setItemQtyInCart
);

// POST /orders/cart/update/:id
router.post(
	"/cart/update/:id",
	authMiddleware.authenticateToken,
	ordersCtrl.updateCartItem
);
// DELETE /orders/cart/items/:id
router.delete(
	"/cart/items/:id",
	authMiddleware.authenticateToken,
	ordersCtrl.removeFromCart
);

router.post(
    "/cart/servings",
    authMiddleware.authenticateToken,
    ordersCtrl.updateServings
)

module.exports = router;
