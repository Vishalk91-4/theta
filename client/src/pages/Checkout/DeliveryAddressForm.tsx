import React, { useEffect } from "react";
import "./DeliveryAddressForm.css";
import FormField from "../../components/Checkout/FormField";
import Button from "../../components/Checkout/Button"

interface DeliveryAddressFormProps {
    onNext: (data: any) => void;
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
    setAddress: React.Dispatch<
        React.SetStateAction<{
            firstName: string;
            lastName: string;
            streetAddress: string;
            streetAddress2: string;
            city: string;
            state: string;
            zipCode: string;
            phoneNumber: string;
        }>
    >;
}

interface Address {
    firstName: string;
    lastName: string;
    streetAddress: string;
    streetAddress2: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
}

const DeliveryAddressForm: React.FC<DeliveryAddressFormProps> = ({ onNext, address, setAddress }) => {
    useEffect(() => {
        // TODO: once the user fills in fields, enable "Continue to Payment" button
        // Currently enabled by default
        const isValid = checkAddressFields(address);
        if (isValid) {
        }
    }, [address]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAddress((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent, onNext: any) => {
        e.preventDefault();
        onNext();
    };

    const checkAddressFields = (address: Address) => {
        return Object.values(address).every((value) => typeof value === "string" && value.trim() !== "");
    };

    // States and their codes to be used in the select dropdown
    const states = [
        { code: "AL", name: "Alabama" },
        { code: "AK", name: "Alaska" },
        { code: "AZ", name: "Arizona" },
        { code: "AR", name: "Arkansas" },
        { code: "CA", name: "California" },
        { code: "CO", name: "Colorado" },
        { code: "CT", name: "Connecticut" },
        { code: "DE", name: "Delaware" },
        { code: "FL", name: "Florida" },
        { code: "GA", name: "Georgia" },
        { code: "HI", name: "Hawaii" },
        { code: "ID", name: "Idaho" },
        { code: "IL", name: "Illinois" },
        { code: "IN", name: "Indiana" },
        { code: "IA", name: "Iowa" },
        { code: "KS", name: "Kansas" },
        { code: "KY", name: "Kentucky" },
        { code: "LA", name: "Louisiana" },
        { code: "ME", name: "Maine" },
        { code: "MD", name: "Maryland" },
        { code: "MA", name: "Massachusetts" },
        { code: "MI", name: "Michigan" },
        { code: "MN", name: "Minnesota" },
        { code: "MS", name: "Mississippi" },
        { code: "MO", name: "Missouri" },
        { code: "MT", name: "Montana" },
        { code: "NE", name: "Nebraska" },
        { code: "NV", name: "Nevada" },
        { code: "NH", name: "New Hampshire" },
        { code: "NJ", name: "New Jersey" },
        { code: "NM", name: "New Mexico" },
        { code: "NY", name: "New York" },
        { code: "NC", name: "North Carolina" },
        { code: "ND", name: "North Dakota" },
        { code: "OH", name: "Ohio" },
        { code: "OK", name: "Oklahoma" },
        { code: "OR", name: "Oregon" },
        { code: "PA", name: "Pennsylvania" },
        { code: "RI", name: "Rhode Island" },
        { code: "SC", name: "South Carolina" },
        { code: "SD", name: "South Dakota" },
        { code: "TN", name: "Tennessee" },
        { code: "TX", name: "Texas" },
        { code: "UT", name: "Utah" },
        { code: "VT", name: "Vermont" },
        { code: "VA", name: "Virginia" },
        { code: "WA", name: "Washington" },
        { code: "WV", name: "West Virginia" },
        { code: "WI", name: "Wisconsin" },
        { code: "WY", name: "Wyoming" },
    ];

    // Props for FormField.tsx
    // Example for 2 column fields
    const fields1 = [
        {
            label: "First Name",
            name: "firstName",
            type: "text",
            value: address.firstName,
            onChange: handleChange,
            required: true,
        },
        {
            label: "Last Name",
            name: "lastName",
            type: "text",
            value: address.lastName,
            onChange: handleChange,
            required: true,
        },
    ];

    // Example for 2 column fields
    const fields2 = [
        {
            label: "Address Line 1",
            name: "streetAddress",
            type: "text",
            value: address.streetAddress,
            onChange: handleChange,
            required: true,
        },
        {
            label: "Address Line 2",
            name: "streetAddress2",
            type: "text",
            value: address.streetAddress2,
            onChange: handleChange,
            required: true,
        },
    ];

    // Example for 3 column fields
    // For mobile responsiveness first element will have own line
    // while other two elements will share line.
    const fields3 = [
        {
            label: "City",
            name: "city",
            type: "text",
            value: address.city,
            onChange: handleChange,
            required: true,
            id: "city",
        },
        {
            label: "State",
            name: "state",
            type: "select",
            value: address.state,
            onChange: handleChange,
            required: true,
            options: states,
            id: "state",
        },
        {
            label: "Zip Code",
            name: "zipCode",
            type: "text",
            value: address.zipCode,
            onChange: handleChange,
            required: true,
            id: "zipCode",
        },
    ];

    // Single column field
    const fields4 = [
        {
            label: "Phone Number",
            name: "phoneNumber",
            type: "tel",
            value: address.phoneNumber,
            onChange: handleChange,
            required: true,
        },
    ];

    return (
        <div className="delivery-container">
            <form id="delivery-form" onSubmit={(e) => handleSubmit(e, onNext)}>
                <h3>Delivery Address</h3>
                <FormField fields={fields1} style={{ display: "flex", gap: "20px" }} />
                <FormField fields={fields2} style={{ display: "flex", gap: "20px" }} />
                <FormField fields={fields3} className="city-state-zip" style={{ display: "flex", gap: "20px" }} />
                <FormField fields={fields4} />
                <FormField style={{display: "flex", alignItems: "center"}}>
                    {/* Web Button */}
                    <Button type="submit" id="webButton">
                        Continue to Payment
                    </Button>
                    {/* Mobile Button */}
                    <Button type="submit" id="mobileButton">
                        Continue to Payment
                    </Button>
                </FormField>
            </form>
        </div>
    );
};

export default DeliveryAddressForm;