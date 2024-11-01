import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import Cookies from "js-cookie";

// Define User type
interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    goals: string[];
    preferences: string[];
    sensitivities: string[];
    homeAddress: string;
    phoneNumber: Number,
    dailyCalories: Number;
    googleID: string;
    age: Number;
    dietaryRestrictions: string[];
    orders: string[];
    servings: Number,
    deliveriesPerWeek: Number,
}

// Define Context type
interface UserContextType {
    user: User | null;
    loginByEmail: (email: string, password: string) => Promise<void>;
    register: (userData: RegisterData) => Promise<void>;
    updateUser: (updateData: Partial<User>) => Promise<void>;
    logOut: () => void;
    loading: boolean;
    token: string | null;
}

// Register data type
interface RegisterData {
    name: string;
    email: string;
    password: string;
    homeAddress: string;
    dailyCalories: string;
    age: string;
}

// Create context with default value as undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            setToken(token);
            fetch("http://localhost:4000/user/show", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message === "Forbidden: invalid token") {
                        setUser(null);
                        logOut();
                        return;
                    } else {
                        setUser(data)
                    }
                })
                .catch((error) => {
                    setUser(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    //Returns user data and JWT token
    const loginByEmail = async (email: string, password: string) => {
        try {
            const response = await fetch("http://localhost:4000/user/login/email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();
            const { token, user } = data.userDetails;
            Cookies.set("token", token, { expires: 1 });
            setToken(token);
            setUser(user);
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const register = async (userData: RegisterData) => {
        try {
            const response = await fetch("http://localhost:4000/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error("Registration failed");
            }

            const data = await response.json();
            const { user, token } = data;
            Cookies.set("token", token, { expires: 1 });
            setToken(token);
            setUser(user);
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const updateUser = async (updateData: Partial<User>) => {
        try {
            const token = Cookies.get("token");
            if (!token) {
                throw new Error("User not authenticated");
            }

            const response = await fetch("http://localhost:4000/user/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updateData),
            });

            if (!response.ok) {
                throw new Error("Update failed");
            }

            const data = await response.json();
            setUser(data);
            console.log(data);
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const logOut = () => {
        Cookies.remove("token");
        setUser(null);
        setToken(null);
    };

    const getToken = () => {
        
    }

    return (
        <UserContext.Provider value={{ user, loginByEmail, logOut, loading, register, updateUser, token }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

export { UserContext };
