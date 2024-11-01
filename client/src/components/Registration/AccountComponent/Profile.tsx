import React, { useState, useEffect } from 'react';
import './DeliveryInfo.css';

interface ProfileProps {
    formData: any;
    setFormData: (data: any) => void;
    handleSubmit: () => void;
    submitStatus: 'idle' | 'submitting' | 'success' | 'error';
}

const Profile: React.FC<ProfileProps> = ({ formData, setFormData, handleSubmit, submitStatus }) => {
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
            <h2>Profile Info</h2>
            <div className='delivery-form'>
                <div className='delivery-form-line1'>
                    <label className='profile-first-name'>
                        First Name
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={profileFields.firstName}
                            onChange={handleChange}
                        />
                    </label>
                    <label className='profile-last-name'>
                        Last Name
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={profileFields.lastName}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className='delivery-form-line1'>
                    <label className='profile-email'>
                        Email
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={profileFields.email}
                            onChange={handleChange}
                        />
                    </label>
                    <label className='profile-phone-number'>
                        Phone Number
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={profileFields.phoneNumber}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>
            <div className='submit-button-container'>
                <button
                    onClick={handleClickSubmit}
                    className={`submit-button ${submitStatus === 'success' ? 'success' : ''}`}
                    disabled={submitStatus === 'submitting'}
                >
                    {submitStatus === 'submitting' ? 'Submitting...' : submitStatus === 'success' ? 'Success!' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default Profile;
