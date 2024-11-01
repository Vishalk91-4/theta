import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import SignUpComponent from '../components/Registration/SignUpComponent/SignUpComponent';
import './SignUp.css';
import { useUserContext } from "../context/UserContext";

const SignUp: React.FC = ({ }) => {
    const { register, user, logOut } = useUserContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        homeAddress: '',
        dailyCalories: '',
        email: '',
        password: '',
    });

    const submitForm = async () => {
        try {
            await register(formData)
            navigate("/registration");
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="login-container">
            {user ? (
                <>
                    <div>Welcome, {user.name}</div>
                    <Link to='/registration'>Continue Registration?</Link>
                    <button onClick={logOut} className='logout-button'>Log Out</button>
                </>
            ) : (
                // <SignUpComponent formData={formData} setFormData={setFormData} submitForm={submitForm} />
                <div></div>
            )}
        </div>
    );
};

export default SignUp;
