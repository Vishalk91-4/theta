import React from 'react';
import '../RegistrationComponents.css';

interface Step3Props {
    formData: any;
    setFormData: (data: any) => void;
    nextStep: () => void;
    prevStep: () => void;
    categories: { _id: string, name: string, description: string, copy: string, sortOrder: number }[];
}

const Step3: React.FC<Step3Props> = ({ formData, setFormData, nextStep, prevStep, categories }) => {
    const handleChange = (preferenceId: string) => {
        const preferences = formData.preferences || [];
        if (preferences.includes(preferenceId)) {
            setFormData({ ...formData, preferences: preferences.filter((p: string) => p !== preferenceId) });
        } else {
            setFormData({ ...formData, preferences: [...preferences, preferenceId] });
        }
    };

    const preferenceCategories = categories
        ? categories.filter(category => category.description.startsWith('Preference:')).sort((a, b) => a.sortOrder - b.sortOrder)
        : [];

    return (
        <div className='outer-step-container'>
            <div className='step-container'>
                <div className='step-inner-container'>
                    <div className='step-container-left'>
                        <div className='category-copy-container'>
                            <h2>What is your food preference?</h2>
                            <span>Select as many as you like.</span>
                        </div>
                    </div>
                    <div className='step-container-right'>
                        <div className='category-button-container'>
                            {preferenceCategories.map(category => (
                                <button
                                    key={category._id}
                                    onClick={() => handleChange(category._id)}
                                    className={`category-button ${formData.preferences.includes(category._id) ? 'selected' : ''}`}
                                >
                                    <div className='preferences-button-copy'>
                                        <span className='category-name'>{category.name}</span>
                                        <span className='category-copy'>{category.copy}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='direction-button-container'>
                    <button onClick={prevStep} className='back-button'>Back</button>
                    <button onClick={nextStep} className='next-button'>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Step3;
