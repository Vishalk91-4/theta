import React from 'react';
import './LogInComponent.css'

interface LogInComponentProps {
    formData: any;
    setFormData: (data: any) => void;
    // nextStep: () => void;
    submitForm: () => void;
}

const LogInComponent: React.FC<LogInComponentProps> = ({ formData, setFormData, submitForm }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className='login-outer-step-container'>
            <div className='login-step-container'>
                <div className='login-form-container'>
                    <h2>Log In</h2>
                    <label> Email
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <label> Password
                        <input
                            type="password"
                            name="password"
                            placeholder="Create Password"
                            value={formData.password || ''}
                            onChange={handleChange}
                        />
                    </label>
                    {/* <button onClick={nextStep}>Next</button> */}
                    <button onClick={submitForm} className='login-submit-button'>Login</button>
                </div>
            </div>
        </div>
    );
};

export default LogInComponent;
