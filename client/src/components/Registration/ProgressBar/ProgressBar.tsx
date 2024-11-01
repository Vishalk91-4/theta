import React from 'react';
import './ProgressBar.css'; 

interface ProgressBarProps {
    currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
    const steps = [
        { number: 1, label: 'Account' },
        { number: 2, label: 'Goals' },
        { number: 3, label: 'Preferences' },
        { number: 4, label: 'Sensitivities' },
        { number: 5, label: 'Plan' },
        { number: 6, label: 'Choose Meals' },
        { number: 7, label: 'Checkout' }
    ];

    return (
        <div className="progress-bar">
            {steps.map((step, index) => (
                <div key={index} className={`step ${currentStep >= step.number ? 'completed' : ''}`}>
                    <div className={`circle ${currentStep === step.number ? 'active-circle' : ''}`}>
                        {currentStep > step.number ? (
                            <div className='checkbox-container'>
                                <div className='checkmark-right'></div>
                                <div className='checkmark-left'></div>
                            </div>
                        ) : (
                            <span className="circle-number">{step.number}</span>
                        )}
                    </div>
                    <div className="step-label">{step.label}</div>
                    {index < steps.length - 1 && <hr className="divider" />}
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
