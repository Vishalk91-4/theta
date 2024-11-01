import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

type MessageProps = {
    content: string;
};

// Renders errors or successfull transactions on the screen.
const Message = ({ content }: MessageProps) => {
    return <p>{content}</p>;
};

const PaypalCheckoutButton: React.FC = () => {
    const createOrder = async () => {
        try {
            const response = await fetch("http://localhost:4000/checkout/paypal/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // use the "body" param to optionally pass additional order information
                // like product ids and quantities
                body: JSON.stringify({
                    cart: [
                        {
                            id: "123",
                            quantity: 1,
                        },
                    ],
                }),
            });
            const orderData = await response.json();
            if (orderData.id) {
                return orderData.id;
            } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error(error);
            setMessage(`Could not initiate PayPal Checkout...${error}`);
        }
    };

    const onApprove = async (data: any, actions: any) => {
        console.log(data)
        try {
            const response = await fetch(`http://localhost:4000/checkout/paypal/orders/${data.orderID}/capture`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const orderData = await response.json();
            // Three cases to handle:
            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            //   (2) Other non-recoverable errors -> Show a failure message
            //   (3) Successful transaction -> Show confirmation or thank you message
            const errorDetail = orderData?.details?.[0];
            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
            } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
            } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                const transaction = orderData.purchase_units[0].payments.captures[0];
                setMessage(
                    `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                );
                console.log("Capture result", orderData, JSON.stringify(orderData, null, 2));
            }
        } catch (error) {
            console.error(error);
            setMessage(`Sorry, your transaction could not be processed...${error}`);
        }
    };

    const [message, setMessage] = useState("");

    return (
        <>
            <PayPalButtons
                style={{
                    shape: "rect",
                    layout: "vertical",
                    color: "gold",
                    label: "paypal",
                    height: 50,
                }}
                createOrder={createOrder}
                onApprove={onApprove}
            />
            <Message content={message} />
        </>
    );
};

export default PaypalCheckoutButton;
