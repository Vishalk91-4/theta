import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import PaypalCheckoutButton from "../PaypalCheckoutButton";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import './CheckoutForm.css';
//TODO: Get order for current user
// Pass order detail to stripe and paypal
// Upon successful payment, show the user status of order and update order on backend

interface CheckoutFormProps {
    deliveryDate: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ deliveryDate }) => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [stripeReady, setStripeReady] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}`,
            },
            redirect: "if_required",
        });

        if (error) {
            console.log(error.message);
        } else {
            setIsProcessing(false);
            setShowModal(true);
        }
    };

    return (
        <>
            <ReactModal
                preventScroll={true}
                ariaHideApp={false}
                isOpen={showModal}
                style={{
                    overlay: {},
                    content: {
                        margin: "auto",
                        width: "fit-content",
                        height: "fit-content",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                        textAlign: "center"
                    },
                }}
            >
                <p>Thank You For Your Order!</p>
                <p>Your order will arrive on</p>
                <h4>{deliveryDate}</h4>
                <p>You can make changes until the order has shipped.</p>
                <button onClick={() => navigate("/menu")} type="submit">
                        Continue Browsing Our Menu
                </button>
            </ReactModal>
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement onReady={() => setStripeReady(true)} />
                {stripeReady ? (
                    <>
                        <button id="card-pay-button" disabled={isProcessing}>
                            <span id="button-text">{isProcessing ? "Processing..." : "Place Order"}</span>
                        </button>
                        {/* <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "16px", marginTop: "10px" }}>
                        or
                    </div> */}
                        {/* <PaypalCheckoutButton /> */}
                    </>
                ) : null}
            </form>
        </>
    );
};

export default CheckoutForm;
