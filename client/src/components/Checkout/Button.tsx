import React from "react";

interface ButtonProps {
    type: "button" | "submit" | "reset";
    id: string;
    name?: string;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, id, name, children }) => (
    <button type={type} id={id} name={name}>
        {children}
    </button>
);

export default Button;