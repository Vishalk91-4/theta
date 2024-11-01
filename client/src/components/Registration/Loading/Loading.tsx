import React from 'react';

interface LoadingProps {
    formData: any;
    setFormData: (data: any) => void;
    prevStep: () => void;
    submitForm: () => void;
}

const Loading: React.FC<LoadingProps> = ({ formData, setFormData, prevStep, submitForm }) => {
    const handleServingsChange = (servings: number) => {
        setFormData({ ...formData, servings });
    };

    const handleDaysChange = (daysPerWeek: number) => {
        setFormData({ ...formData, daysPerWeek });
    };

    return (
        <div className='outer-step-container'>
            <div className='step-container'>
                <div className='loading-container'>
                    <span className='loading-header'>Thanks for submitting! Please wait while we generate your meal suggestions...</span>

                    <div id="cooking">
                        <div className="bubble"></div>
                        <div className="bubble"></div>
                        <div className="bubble"></div>
                        <div className="bubble"></div>
                        <div className="bubble"></div>
                        <div id="area">
                            <div id="sides">
                                <div id="pan"></div>
                                <div id="handle"></div>
                            </div>
                            <div id="pancake">
                                <div id="pastry"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
