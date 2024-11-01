import React, { useState, useEffect } from 'react';
import './DeliveryInfo.css';

interface DeliveryInfoProps {
    formData: any;
    setFormData: (data: any) => void;
    handleSubmit: () => void;
    submitStatus: 'idle' | 'submitting' | 'success' | 'error';
}

const DeliveryInfo: React.FC<DeliveryInfoProps> = ({ formData, setFormData, handleSubmit, submitStatus }) => {
    const [dayOfDelivery, setDayOfDelivery] = useState('Sunday');
    const [submitClick, setSubmitClick] = useState(false);
    const [addressFields, setAddressFields] = useState({
        street: '',
        addressLine2: '',
        city: '',
        state: '',
        zipcode: '',
        phoneNumber: ''
    });

    // Update addressFields whenever formData.homeAddress changes
    useEffect(() => {
        if (formData.homeAddress) {
            const parsedAddress = parseAddress(formData.homeAddress);
            setAddressFields(parsedAddress);
        }
    }, [formData.homeAddress]);

    // Function to parse the homeAddress into individual fields
    const parseAddress = (address: string) => {
        // Dummy parsing logic; replace with actual parsing as needed
        const parts = address.split(',').map(part => part.trim());
        return {
            street: parts[0] || '',
            addressLine2: parts[1] || '',
            city: parts[2] || '',
            state: parts[3] || '',
            zipcode: parts[4] || '',
            phoneNumber: parts[5] || ''
        };
    };

    // Handle change in any input field
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddressFields(prevAddressFields => ({
            ...prevAddressFields,
            [name]: value
        }));
    };

        // Handle change in the day of delivery select
        const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setDayOfDelivery(e.target.value);
            // Optionally update formData with selected day
            setFormData({
                ...formData,
                deliveryDay: e.target.value // Update formData with selected delivery day
            });
        };

    function handleClickSubmit() {
        // Update homeAddress in formData with all address fields
        setFormData({
            ...formData,
            homeAddress: `${addressFields.street}, ${addressFields.addressLine2}, ${addressFields.city}, ${addressFields.state}, ${addressFields.zipcode}, ${addressFields.phoneNumber}`
        });
        setSubmitClick(true);
    }

    useEffect(() => {
        if (formData.homeAddress) {
            const parsedAddress = parseAddress(formData.homeAddress);
            setAddressFields(parsedAddress);
        }
        if (submitClick) {
            handleSubmit()
        } 
    }, [formData.homeAddress]);

    return (
        <div className='DeliveryInfo'>
            <h2>Delivery Info</h2>
            <h3>Delivery Address</h3>
            <div className='delivery-form'>
                <div className='delivery-form-line1'>
                    <label className='delivery-street'>
                        Street
                        <input
                            type="text"
                            name="street"
                            placeholder="Street"
                            value={addressFields.street}
                            onChange={handleChange}
                        />
                    </label>
                    <label className='delivery-addressLine2'>
                        Address Line 2
                        <input
                            type="text"
                            name="addressLine2"
                            placeholder="Address Line 2"
                            value={addressFields.addressLine2}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className='delivery-form-line2'>
                    <label className='delivery-city'>
                        City
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={addressFields.city}
                            onChange={handleChange}
                        />
                    </label>
                    <label className='delivery-state'>
                        State
                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={addressFields.state}
                            onChange={handleChange}
                        />
                    </label>
                    <label className='delivery-zipcode'>
                        Zip Code
                        <input
                            type="text"
                            name="zipcode"
                            placeholder="Zip Code"
                            value={addressFields.zipcode}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className='delivery-form-line3'>
                    <label className='delivery-phoneNumber'>
                        Phone Number
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={addressFields.phoneNumber}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>
            <div className='day-of-delivery'>
            <label>
                    Day of delivery
                    <select
                        value={dayOfDelivery}
                        onChange={handleDayChange}
                    >
                        <option value="Sunday">Sunday</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                    </select>
                </label>
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

export default DeliveryInfo;
