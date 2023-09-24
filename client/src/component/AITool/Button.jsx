import React from "react";
// import "./style.css";

export const Button = ({ className, text }) => {
    return (
        <div className={`button-primary ${className}`}>
            <div className="label">{text}</div>
        </div>
    );
};