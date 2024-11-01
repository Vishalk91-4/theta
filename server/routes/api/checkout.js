const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const checkoutService = require("../../services/checkout")
const authMiddleware = require("../../utils/authMiddleware");

//TODO: add auth middleware to routes

router.post("/create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "usd",
            amount: 1999,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
});

// createOrder route
router.post("/paypal/orders", async (req, res) => {
    try {
        // use the cart information passed from the front-end to calculate the order amount detals
        const { cart } = req.body;
        const { jsonResponse, httpStatusCode } = await checkoutService.createOrder(cart);
        res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ error: "Failed to create order." });
    }
});

// captureOrder route
router.post("/paypal/orders/:orderID/capture", async (req, res) => {
    try {
        const { orderID } = req.params;
        const { jsonResponse, httpStatusCode } = await checkoutService.captureOrder(orderID);
        res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ error: "Failed to capture order." });
    }
});

module.exports = router;