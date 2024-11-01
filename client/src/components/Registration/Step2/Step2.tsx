import React from 'react';
import '../RegistrationComponents.css';

interface Step2Props {
    formData: any;
    setFormData: (data: any) => void;
    nextStep: () => void;
    prevStep: () => void;
    categories: { _id: string, name: string, description: string, sortOrder: number }[]; 
}

const Step2: React.FC<Step2Props> = ({ formData, setFormData, nextStep, prevStep, categories }) => {
    const handleChange = (goalId: string) => {
        const currentGoals = formData.goals || [];
        if (currentGoals.includes(goalId)) {
            // Remove the goal from the array
            setFormData({ ...formData, goals: currentGoals.filter((g: string) => g !== goalId) });
        } else {
            // Add the goal to the array
            setFormData({ ...formData, goals: [...currentGoals, goalId] });
        }
    };

    const goalCategories = categories
        ? categories.filter(category => category.description.startsWith('Goal:')).sort((a, b) => a.sortOrder - b.sortOrder)
        : [];

    return (
        <div className='outer-step-container'>
            <div className='step-container'>
                <div className='step-inner-container'>
                    <div className='step-container-left'>
                        <div className='category-copy-container'>
                            <h2>Tell us your goals</h2>
                            <span>Your choices help our AI recommend meals that cater to your needs</span>
                        </div>
                    </div>
                    <div className='step-container-right'>
                        <div className='category-button-container'>
                            {goalCategories.map(category => (
                                <button 
                                    key={category._id} 
                                    onClick={() => handleChange(category._id)} 
                                    className={`category-button ${formData.goals.includes(category._id) ? 'selected' : ''}`}
                                >
                                    {category.name}
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

export default Step2;
