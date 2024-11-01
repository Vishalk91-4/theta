import React, { useState, useEffect, Profiler } from 'react';
import { useUserContext } from "../../../context/UserContext";
import PlanSettings from './PlanSettings';
import '../RegistrationComponents.css';
import './AccountComponent.css';
import DietarySelections from './DietarySelections';
import DeliveryInfo from './DeliveryInfo';
import Profile from './Profile';
import Payment from './Payment';

interface AccountComponentProps {}

const AccountComponent: React.FC<AccountComponentProps> = () => {
    const { user, token, updateUser, logOut, register } = useUserContext();
    const [categories, setCategories] = useState([]);
    const [accountCategory, setAccountCategory] = useState('profile');
    const [formData, setFormData] = useState({
        servings: user?.servings || 1,
        deliveriesPerWeek: user?.deliveriesPerWeek || 1,
        preferences: user?.preferences || [], 
        sensitivities: user?.sensitivities || [],
        homeAddress: user?.homeAddress || '',
        name: user?.name || '',
        email: user?.email || '',
    });
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                if (!token) {
                    throw new Error("No token found");
                }

                const response = await fetch("http://localhost:4000/category/show", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();
                setCategories(data);
                console.log("Categories Data: ", data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (user) {
            setFormData({
                servings: user.servings || 1,
                deliveriesPerWeek: user.deliveriesPerWeek || 1,
                preferences: user.preferences || [],
                sensitivities: user.sensitivities || [],
                homeAddress: user.homeAddress || '',
                name: user.name || '',
                email: user.email || '',
            });
        }
    }, [user]);

    const handleSubmit = async () => {
        setSubmitStatus('submitting');
        try {
            await updateUser(formData);
            setSubmitStatus('success');
            setTimeout(() => setSubmitStatus('idle'), 1000); 
        } catch (error) {
            console.error('Error updating user data:', error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 1000); 
        }
    };

    const renderCategoryContent = () => {
        switch (accountCategory) {
            case 'profile':
                return <Profile formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} submitStatus={submitStatus} />;
            case 'plan-settings':
                return <PlanSettings formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} submitStatus={submitStatus} />;
            case 'dietary-selections':
                return <DietarySelections formData={formData} setFormData={setFormData} categories={categories} handleSubmit={handleSubmit} submitStatus={submitStatus} />;
            case 'delivery-info':
                return <DeliveryInfo formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} submitStatus={submitStatus} />;
            case 'payment':
                return <Payment formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} submitStatus={submitStatus} />;
            default:
                return null;
        }
    };

    return (
        <div className='outer-step-container-account'>
            <div className='step-inner-container-account'>
                <div className='step-container-left-account'>
                    <h2 className='account-h2'>Account</h2>
                    <div className='account-category' onClick={() => setAccountCategory('profile')}>Profile</div>
                    <div className='account-category' onClick={() => setAccountCategory('plan-settings')}>Plan Settings</div>
                    <div className='account-category' onClick={() => setAccountCategory('dietary-selections')}>Dietary Selections</div>
                    <div className='account-category' onClick={() => setAccountCategory('delivery-info')}>Delivery Info</div>
                    <div className='account-category' onClick={() => setAccountCategory('payment')}>Payment</div>
                </div>
                <div className='step-container-right-account'>
                    {renderCategoryContent()}
                </div>
            </div>
        </div>
    );
};

export default AccountComponent;
