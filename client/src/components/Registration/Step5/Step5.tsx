import React from "react";
import OrderSummary from "../../Checkout/OrderSummary";

interface Step5Props {
	formData: any;
	setFormData: (data: any) => void;
	prevStep: () => void;
	submitForm: () => void;
}

const Step5: React.FC<Step5Props> = ({
	formData,
	setFormData,
	prevStep,
	submitForm,
}) => {
	const handleServingsChange = (servings: number) => {
		setFormData({ ...formData, servings });
	};

	const handleDeliveriesChange = (deliveriesPerWeek: number) => {
		setFormData({ ...formData, deliveriesPerWeek });
	};

	return (
		<div className="outer-step-container">
			<div className="step-container">
				<div className="category-copy-container">
					<h2>Select your plan</h2>
					<span>You can change this at any time.</span>
				</div>
				<div className="step-inner-container">
					<div className="step-container-left-5">
						<div className="step-container-servings">
							<h3>How many servings?</h3>
							<div className="category-button-container-5">
								<button
									onClick={() => handleServingsChange(1)}
									className={`category-button-5 ${
										formData.servings === 1
											? "selected"
											: ""
									}`}
								>
									1
								</button>
								<button
									onClick={() => handleServingsChange(2)}
									className={`category-button-5 ${
										formData.servings === 2
											? "selected"
											: ""
									}`}
								>
									2
								</button>
								<button
									onClick={() => handleServingsChange(4)}
									className={`category-button-5 ${
										formData.servings === 4
											? "selected"
											: ""
									}`}
								>
									4
								</button>
							</div>
						</div>
						<div className="step-container-days">
							<h3>How many days per week?</h3>
							<div className="category-button-container-5">
								<button
									onClick={() => handleDeliveriesChange(1)}
									className={`category-button-5 ${
										formData.deliveriesPerWeek === 1
											? "selected"
											: ""
									}`}
								>
									1
								</button>
								<button
									onClick={() => handleDeliveriesChange(3)}
									className={`category-button-5 ${
										formData.deliveriesPerWeek === 3
											? "selected"
											: ""
									}`}
								>
									3
								</button>
								<button
									onClick={() => handleDeliveriesChange(5)}
									className={`category-button-5 ${
										formData.deliveriesPerWeek === 5
											? "selected"
											: ""
									}`}
								>
									5
								</button>
								<button
									onClick={() => handleDeliveriesChange(7)}
									className={`category-button-5 ${
										formData.deliveriesPerWeek === 7
											? "selected"
											: ""
									}`}
								>
									7
								</button>
							</div>
						</div>
					</div>
					<div className="step-container-right-5">
						<OrderSummary showDayDropdown={false} formData={formData} plan={true} />
					</div>
				</div>
				<div className="direction-button-container">
					<button onClick={prevStep} className="back-button">
						Back
					</button>
					<button onClick={submitForm} className="submit-button">
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default Step5;
