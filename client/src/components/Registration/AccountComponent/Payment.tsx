import React, { useState, useEffect } from 'react';
import './DeliveryInfo.css';

interface PaymentProps {
    formData: any;
    setFormData: (data: any) => void;
    handleSubmit: () => void;
    submitStatus: 'idle' | 'submitting' | 'success' | 'error';
}

const Payment: React.FC<PaymentProps> = ({ formData, setFormData, handleSubmit, submitStatus }) => {
    const [submitClick, setSubmitClick] = useState(false);
    const [profileFields, setProfileFields] = useState({
        firstName: '',
        lastName: '',
        email: formData.email || '',
        phoneNumber: ''
    });

    // Update profileFields whenever formData.name changes
    useEffect(() => {
        if (formData.name) {
            const parsedName = parseName(formData.name);
            setProfileFields({
                ...profileFields,
                ...parsedName,
                email: formData.email || '',
                phoneNumber: formData.phoneNumber || ''
            });
        }
    }, [formData.name, formData.email, formData.phoneNumber]);

    // Function to parse the name into firstName and lastName
    const parseName = (name: string) => {
        const [firstName, lastName] = name.split(' ');
        return {
            firstName: firstName || '',
            lastName: lastName || ''
        };
    };

    // Handle change in any input field
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileFields(prevProfileFields => ({
            ...prevProfileFields,
            [name]: value
        }));
    };

    function handleClickSubmit() {
        // Update name in formData with concatenated firstName and lastName
        setFormData({
            ...formData,
            name: `${profileFields.firstName} ${profileFields.lastName}`,
            email: profileFields.email,
            phoneNumber: profileFields.phoneNumber
        });
        setSubmitClick(true);
    }

    useEffect(() => {
        if (submitClick) {
            handleSubmit();
            setSubmitClick(false);
        }
    }, [formData.name, formData.email, formData.phoneNumber, submitClick]);

    return (
        <div className='DeliveryInfo'>
            <h2>Payment</h2>
            <h3>Saved Payment Methods</h3>
            <div className='payment-methods'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Payment;
