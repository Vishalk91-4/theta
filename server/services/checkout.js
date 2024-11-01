const base = "https://api-m.sandbox.paypal.com";
const { generateAccessToken, handleResponse } = require("../utils/paypalUtils");

const captureOrder = async (orderID) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;
    console.log(url)

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return handleResponse(response);
};

const createOrder = async (cart) => {
    // use the cart information passed from the front-end to calculate the purchase unit details
    console.log("shopping cart information passed from the frontend createOrder() callback:", cart);

    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;

    const payload = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: "100",
                },
            },
        ],
    };

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
        body: JSON.stringify(payload),
    });

    return handleResponse(response);
};

module.exports = { captureOrder, createOrder };
