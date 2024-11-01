import React from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
    clientId: "test",
    "disable-funding": ["venmo", "card", "paylater"],
    currency: "USD",
    "data-page-type": "product-details",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
};

const PaypalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <PayPalScriptProvider options={initialOptions}>{children}</PayPalScriptProvider>
);

export default PaypalProvider;
