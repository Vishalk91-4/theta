import React, { useState, useEffect } from "react";
import "./OrderSummary.css";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

interface OrderSummaryProps {
    setDeliveryDate?: React.Dispatch<React.SetStateAction<any>>;
    showDayDropdown: boolean;
    formData?: FormData;
    plan?: boolean;
    checkout?: boolean;
}

interface FormData {
    goals: string[];
    preferences: string[];
    sensitivities: string[];
    servings: number;
    deliveriesPerWeek: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
    setDeliveryDate = () => {},
    showDayDropdown,
    formData,
    plan,
    checkout,
}) => {
    const { token, logOut } = useUserContext();
    const navigate = useNavigate();
    const [dates, setDates] = useState<string[]>([]);
    const [orderData, setOrderData] = useState<{ servings: number; deliveriesPerWeek: number, shipping: number, tax: number, orderTotal: number }>({
        servings: formData?.servings ?? 1,
        deliveriesPerWeek: formData?.deliveriesPerWeek ?? 1,
        shipping: 10.99,
        tax: 10.99,
        orderTotal: 0
    });

    const generateDates = () => {
        const today = new Date();
        today.setDate(today.getDate() + 7); // Start from a week from today
        const tempDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric" };
            tempDates.push(date.toLocaleDateString("en-US", options));
        }
        setDates(tempDates);
    };

    // If page is rendered during registration (i.e. selecting servings and deliveries per
    // per week) get data from form. If rendered on checkout page, get order data from server
    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                logOut();
                navigate("login");
            }
            if (formData) {
                setOrderData((prevData) => ({
                    ...prevData,
                    servings: formData.servings,
                    deliveriesPerWeek: formData.deliveriesPerWeek,
                }));
            } else {
                const response = await fetch("http://localhost:4000/orders/cart", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();
                if (data.message === "Forbidden: invalid token") {
                    navigate("../login");
                    return;
                } else {
                    setOrderData((prevData) => ({
                        ...prevData,
                        servings: data.servings,
                        deliveriesPerWeek: data.deliveriesPerWeek,
                        shipping: data.shipping,
                        tax: data.tax,
                        orderTotal: data.orderTotal
                    }));
                }
            }
        };
        fetchData();
    }, [formData]);

    useEffect(() => {
        generateDates();
    }, []);

    return (
        <div className="order-summary" style={{ width: "100%" }}>
            <h3>Order Summary</h3>
            {showDayDropdown ? (
                <fieldset style={{ display: "flex", gap: "20px" }}>
                    <div>
                        <label>First Delivery Date</label>
                        <select
                            id="fieldSelect"
                            required
                            name="state"
                            onChange={(e) => setDeliveryDate(e.target.value)}
                        >
                            {dates.map((date, index) => (
                                <option key={index} value={date}>
                                    {date}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
            ) : null}
            <fieldset className="money-amounts">
                {/* For plan choosing page */}
                {plan ? (
                    <>
                        <div className="line-total">
                            <span>
                                {orderData.servings} Servin{orderData.deliveriesPerWeek > 1 ? "gs" : "g"} Plan
                            </span>
                            <span>${orderData.servings * 10.99}</span>
                        </div>
                        <div className="line-details">
                            <span>
                                {orderData.deliveriesPerWeek} Deliver{orderData.deliveriesPerWeek > 1 ? "ies" : "y"} Per
                                Week
                            </span>
                        </div>
                        <hr />
                        <div className="order-total">
                            <span>Sub-Total</span>
                            <span>${Number(orderData.servings * orderData.deliveriesPerWeek * 10.99 * 3).toFixed(2)}</span>
                        </div>
                    </>
                ) : null}
                {/* For checkout page */}
                {checkout ? (
                    <>
                        <div className="line-total">
                            <span>
                                {orderData.servings} Servin{orderData.deliveriesPerWeek > 1 ? "gs" : "g"} Plan
                            </span>
                            <span>${orderData.servings * 10.99 * 3}</span>
                        </div>
                        <div className="line-details">
                            <span>
                                {orderData.deliveriesPerWeek} Deliver{orderData.deliveriesPerWeek > 1 ? "ies" : "y"} Per
                                Week
                            </span>
                        </div>
                        <div className="shipping-details">
                            <span>Shipping</span>
                            <span>
                                ${orderData.shipping}
                            </span>
                        </div>
                        <div className="tax-details">
                            <span>Tax</span>
                            <span>
                                ${orderData.shipping}
                            </span>
                        </div>
                        <hr />
                        <div className="order-total">
                            <span>Order Total</span>
                            <span>${Number(orderData.orderTotal).toFixed(2)}</span>
                        </div>
                    </>
                ) : null}
            </fieldset>
        </div>
    );
};

export default OrderSummary;
