import React, { useState, useEffect } from "react";
import "./PaymentEntryForm.css";
import OrderSummary from "../../components/Checkout/OrderSummary";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/Checkout/CheckoutForm";

interface PaymentEntryFormProps {
    onNext: (data: any) => void;
    setStep: (data: number) => void;
    address: {
        firstName: string;
        lastName: string;
        streetAddress: string;
        streetAddress2: string;
        city: string;
        state: string;
        zipCode: string;
        phoneNumber: string;
    };
}

// This value is the default first delivery date if user doesn't select dropdown
const defaultDeliveryDate = (): string => {
    const today = new Date();
    today.setDate(today.getDate() + 7)
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(today);
    return formattedDate;
  }

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string);
console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
const PaymentEntryForm: React.FC<PaymentEntryFormProps> = ({ address, setStep }) => {
    const [clientSecret, setClientSecret] = useState("");
    const [deliveryDate, setDeliveryDate] = useState<string>(defaultDeliveryDate());

    useEffect(() => {
        fetch("http://localhost:4000/checkout/create-payment-intent", {
            method: "POST",
            body: JSON.stringify({}),
        }).then(async (r) => {
            const { clientSecret } = await r.json();

            setClientSecret(clientSecret);
        });
    }, []);

    const options = {
        clientSecret: clientSecret,
        appearance: {
            rules: {
                ".Label": {
                    fontWeight: "bold",
                    fontSize: "16px",
                },
                ".Input": {
                    borderRadius: "8px",
                    border: "1px solid #937676",
                },
                ".Input::placeholder": {
                    fontWeight: "bold",
                },
            },
        },
    };

    return (
        <div className="payment-checkout-container ">
            <div className="address-container">
                <h3>Set Delivery Address</h3>
                <div className="current-address">
                    <p>
                        {address.firstName} {address.lastName}
                    </p>
                    <p>{address.streetAddress}</p>
                    <p>{address.streetAddress2}</p>
                    <p>
                        {address.city}, {address.state}, {address.zipCode}
                    </p>
                </div>
                <span onClick={() => setStep(1)}>Set/Edit</span>
            </div>
            <div className="order-summary-box">
                <OrderSummary setDeliveryDate={setDeliveryDate} showDayDropdown={true} checkout={true} />
            </div>
            <div className="payment-info-container">
                <h3>Payment Information</h3>
                {stripePromise && clientSecret && (
                    <Elements stripe={stripePromise} options={options} key={clientSecret}>
                        <CheckoutForm deliveryDate={deliveryDate} />
                    </Elements>
                )}
            </div>
        </div>
    );
};

export default PaymentEntryForm;
