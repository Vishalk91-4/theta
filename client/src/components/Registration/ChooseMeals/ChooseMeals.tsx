import React from 'react';

interface ChooseMealsProps {
    formData: any;
    setFormData: (data: any) => void;
    prevStep: () => void;
    submitForm: () => void;
}

const ChooseMeals: React.FC<ChooseMealsProps> = ({ formData, setFormData, prevStep, submitForm }) => {
    const handleServingsChange = (servings: number) => {
        setFormData({ ...formData, servings });
    };

    const handleDaysChange = (daysPerWeek: number) => {
        setFormData({ ...formData, daysPerWeek });
    };

    return (
        <div className='outer-step-container'>
            <div className='step-container'>
                {/* <div className='category-copy-container'>
                    <h2>Select your plan</h2>
                    <span>You can change this at any time.</span>
                </div>
                <div className='step-inner-container'>
                    <div className='step-container-left-5'>
                        <div className='step-container-servings'>
                            <h3>How many servings?</h3>
                            <div className='category-button-container-5'>
                                <button onClick={() => handleServingsChange(1)} className={`category-button-5 ${formData.servings === 1 ? 'selected' : ''}`}>1</button>
                                <button onClick={() => handleServingsChange(2)} className={`category-button-5 ${formData.servings === 2 ? 'selected' : ''}`}>2</button>
                                <button onClick={() => handleServingsChange(4)} className={`category-button-5 ${formData.servings === 4 ? 'selected' : ''}`}>4</button>
                            </div>
                        </div>
                        <div className='step-container-days'>
                            <h3>How many days per week?</h3>
                            <div className='category-button-container-5'>
                                <button onClick={() => handleDaysChange(1)} className={`category-button-5 ${formData.daysPerWeek === 1 ? 'selected' : ''}`} >1</button>
                                <button onClick={() => handleDaysChange(3)} className={`category-button-5 ${formData.daysPerWeek === 3 ? 'selected' : ''}`} >3</button>
                                <button onClick={() => handleDaysChange(5)} className={`category-button-5 ${formData.daysPerWeek === 5 ? 'selected' : ''}`} >5</button>
                                <button onClick={() => handleDaysChange(7)} className={`category-button-5 ${formData.daysPerWeek === 7 ? 'selected' : ''}`} >7</button>
                            </div>
                        </div>
                    </div>
                    <div className='step-container-right-5'>
                        <div className='order-summary-container'>
                            <h3>Order Summary</h3>
                            <div className='order-summary-items'>
                                <div className='price-per-serving'>
                                    <span className='item-copy'>Price per serving</span>
                                    <span className='amount'>$10.99</span>
                                </div>
                                <div className='shipping'>
                                    <span className='item-copy'>Shipping</span>
                                    <span className='amount'>$10.99</span>
                                </div>
                                <div className='first-order-subtotal'>
                                    <span className='item-copy subtotal'>First order subtotal</span>
                                    <span className='amount'>$76.93</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <h2>Choose Meals</h2>
                <div className='direction-button-container'>
                    <button onClick={prevStep} className='back-button'>Back</button>
                    <button onClick={submitForm} className='submit-button'>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default ChooseMeals;
