import React, { useState } from "react";
import DeliveryAddressForm from "./DeliveryAddressForm";
import PaymentEntryForm from "./PaymentEntryForm";
import "./Checkout.css";

//TODO: Delete test data and replace with empty strings when done testing

const CheckoutPage = () => {
    const [step, setStep] = useState(2);
    // This is to test data without typing it in each time
    const [address, setAddress] = useState({
        firstName: "John",
        lastName: "Doe",
        streetAddress: "123 Main Street",
        streetAddress2: "Apt 123",
        city: "Albuquerque",
        state: "NM",
        zipCode: "87101",
        phoneNumber: "5058738901",
    });
    // const [address, setAddress] = useState({
    //     firstName: "",
    //     lastName: "",
    //     streetAddress: "",
    //     streetAddress2: "",
    //     city: "",
    //     state: "",
    //     zipCode: "",
    //     phoneNumber: "",
    // });

    // On Delivery Page when user clicks "Continue To Payment" it should
    // go to the Payment Screen
    const handleNext = () => {
        if (step === 1) {
            setStep(2);
        } else if (step === 2) {
            return
        }
    };

    return (
        <>
            {step === 1 && <DeliveryAddressForm onNext={handleNext} setAddress={setAddress} address={address} />}
            {step === 2 && (
                <PaymentEntryForm
                    onNext={handleNext}
                    address={address}
                    setStep={setStep}
                />
            )}
        </>
    );
};

export default CheckoutPage;
