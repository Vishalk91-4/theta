import React, { useState, useEffect } from "react";
// import Account from "../components/Registration/Account/Account";
import SignUpComponent from "../components/Registration/SignUpComponent/SignUpComponent";
import Step2 from "../components/Registration/Step2/Step2";
import Step3 from "../components/Registration/Step3/Step3";
import Step4 from "../components/Registration/Step4/Step4";
import Step5 from "../components/Registration/Step5/Step5";
import ProgressBar from "../components/Registration/ProgressBar/ProgressBar";
import "./Registration.css";
import Loading from "../components/Registration/Loading/Loading";
import "./Registration.css";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import MealList from "../components/MealList";

const Registration: React.FC = () => {
    const { user, token, updateUser, logOut, register } = useUserContext();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        goals: [],
        preferences: [],
        sensitivities: [],
        servings: 1,
        deliveriesPerWeek: 1,
        street: "",
        addressLine2: "",
        city: "",
        state: "",
        zipcode: 11111,
        phoneNumber: 1111111111,
    });
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [showProgressBar, setShowProgressBar] = useState(window.innerWidth > 600);
    const [loading, setLoading] = useState(false);
    const [signUpFormData, setSignUpFormData] = useState({
        name: '',
        age: '',
        homeAddress: '',
        dailyCalories: '',
        email: '',
        password: '',
    });

    const submitSignUpForm = async () => {
        try {
            await register(signUpFormData)
            setStep(step + 1);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                if (!token) {
                    throw new Error("No token found");
                }

                const response = await fetch("http://localhost:4000/category/show", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();
                setCategories(data);
                console.log("Categories Data: ", data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, [token, navigate]);

    useEffect(() => {
        const handleResize = () => {
            setShowProgressBar(window.innerWidth > 600);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const submitForm = async () => {
        try {
            setLoading(true); 
            await updateUser(formData);
            console.log(formData)
            setFormSubmitted(true);
            setTimeout(() => {
                setLoading(false); 
                setStep(step + 1);
            }, 5000); 
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    };

    return (
        <div className="registration-container">
            {showProgressBar && <ProgressBar currentStep={step} />} 
            <div className="registration-steps">
                {step === 1 && (
                    <SignUpComponent 
                        signUpFormData={signUpFormData} 
                        setSignUpFormData={setSignUpFormData} 
                        submitSignUpForm={submitSignUpForm} 
                    />
                )}
                {step === 2 && (
                    <Step2
                        formData={formData}
                        setFormData={setFormData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        categories={categories}
                    />
                )}
                {step === 3 && (
                    <Step3
                        formData={formData}
                        setFormData={setFormData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        categories={categories}
                    />
                )}
                {step === 4 && (
                    <Step4
                        formData={formData}
                        setFormData={setFormData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        categories={categories}
                    />
                )}
                {step === 5 && !loading &&(
                    <Step5
                        formData={formData}
                        setFormData={setFormData}
                        prevStep={prevStep}
                        submitForm={submitForm}
                    />
                )}
                {step === 5 && loading && (
                    <Loading
                        formData={formData}
                        setFormData={setFormData}
                        prevStep={prevStep}
                        submitForm={submitForm}
                    />
                )}
                {step === 6 && (
                    <MealList nextStep={nextStep} />
                )}
            </div>
        </div>
    );
};

export default Registration;
