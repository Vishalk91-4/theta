import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogInComponent from "../components/Registration/LogInComponent/LogInComponent";
import "./LogIn.css";
import { useUserContext } from "../context/UserContext";

const LogIn: React.FC = () => {
    const { loginByEmail, user, logOut } = useUserContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const submitForm = async () => {
        try {
            await loginByEmail(formData.email, formData.password);
            navigate("/account");
        } catch (error: any) {
            console.error("Error:", error.message);
        }
    };

    return (
        <div className="login-container">
            {user ? (
                <>
                    <div>Welcome, {user.name}</div>
                    <button onClick={logOut} className="logout-button">Log Out</button>
                </>
            ) : (
                <LogInComponent formData={formData} setFormData={setFormData} submitForm={submitForm} />
            )}
        </div>
    );
};

export default LogIn;
