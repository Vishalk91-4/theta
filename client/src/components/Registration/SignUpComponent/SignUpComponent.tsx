import React from 'react';
import './SignUpComponent.css'

interface SignUpComponentProps {
    signUpFormData: any;
    setSignUpFormData: (data: any) => void;
    submitSignUpForm: () => void;
}

const SignUpComponent: React.FC<SignUpComponentProps> = ({ signUpFormData, setSignUpFormData, submitSignUpForm }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (signUpFormData.name && signUpFormData.email && signUpFormData.password) {
            submitSignUpForm();
        } else {
            alert('Please fill in all required fields (Name, Email, Password)');
        }
    };

    return (
        <div className='signup-outer-step-container'>
            <div className='signup-step-container'>
                <div className='signup-form-container'>
                    <h2>Get Started</h2>
                    <input
                        type="name"
                        name="name"
                        placeholder="Name"
                        required={true}
                        value={signUpFormData.name || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="age"
                        name="age"
                        placeholder="Age"
                        value={signUpFormData.age || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="homeAddress"
                        name="homeAddress"
                        placeholder="Home Address"
                        value={signUpFormData.homeAddress || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="dailyCalories"
                        name="dailyCalories"
                        placeholder="Daily Calories"
                        value={signUpFormData.dailyCalories || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required={true}
                        value={signUpFormData.email || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        required={true}
                        placeholder="Create Password"
                        value={signUpFormData.password || ''}
                        onChange={handleChange}
                    />
                    <button onClick={handleSubmit} className='signup-submit-button'>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default SignUpComponent;
