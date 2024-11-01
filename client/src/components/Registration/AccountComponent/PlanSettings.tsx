import React from "react";

interface PlanSettingsProps {
    formData: any;
    setFormData: (data: any) => void;
    handleSubmit: () => void;
    submitStatus: 'idle' | 'submitting' | 'success' | 'error';
}

const PlanSettings: React.FC<PlanSettingsProps> = ({
    formData,
    setFormData,
    handleSubmit,
    submitStatus
}) => {
    const handleServingsChange = (servings: number) => {
        setFormData({ ...formData, servings });
    };

    const handleDeliveriesChange = (deliveriesPerWeek: number) => {
        setFormData({ ...formData, deliveriesPerWeek });
    };

    return (
        <div className="step-container-left-5">
            <div className="DeliveryInfo">
                <h2>Plan Settings</h2>
                <h3>How many servings?</h3>
                <div className="category-button-container-5">
                    <button
                        onClick={() => handleServingsChange(1)}
                        className={`category-button-5 ${
                            formData.servings === 1 ? "selected" : ""
                        }`}
                    >
                        1
                    </button>
                    <button
                        onClick={() => handleServingsChange(2)}
                        className={`category-button-5 ${
                            formData.servings === 2 ? "selected" : ""
                        }`}
                    >
                        2
                    </button>
                    <button
                        onClick={() => handleServingsChange(4)}
                        className={`category-button-5 ${
                            formData.servings === 4 ? "selected" : ""
                        }`}
                    >
                        4
                    </button>
                </div>
            </div>
            <div className="DeliveryInfo">
                <h3>How many deliveries per week?</h3>
                <div className="category-button-container-5">
                    <button
                        onClick={() => handleDeliveriesChange(1)}
                        className={`category-button-5 ${
                            formData.deliveriesPerWeek === 1 ? "selected" : ""
                        }`}
                    >
                        1
                    </button>
                    <button
                        onClick={() => handleDeliveriesChange(3)}
                        className={`category-button-5 ${
                            formData.deliveriesPerWeek === 3 ? "selected" : ""
                        }`}
                    >
                        3
                    </button>
                    <button
                        onClick={() => handleDeliveriesChange(5)}
                        className={`category-button-5 ${
                            formData.deliveriesPerWeek === 5 ? "selected" : ""
                        }`}
                    >
                        5
                    </button>
                    <button
                        onClick={() => handleDeliveriesChange(7)}
                        className={`category-button-5 ${
                            formData.daysPerWeek === 7 ? "selected" : ""
                        }`}
                    >
                        7
                    </button>
                </div>
            </div>
            <div className="submit-button-container">
                <button 
                    onClick={handleSubmit} 
                    className={`submit-button ${submitStatus === 'success' ? 'success' : ''}`}
                    disabled={submitStatus === 'submitting'}
                >
                    {submitStatus === 'submitting' ? 'Submitting...' : submitStatus === 'success' ? 'Success!' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default PlanSettings;
