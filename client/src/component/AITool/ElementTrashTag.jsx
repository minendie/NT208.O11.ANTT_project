import React from "react";
import './styles.css'

export const ElementTrashTag = ({text}) => {
    return (
        <div className="element-trash-tag">
            <div className="trash-type">{text}</div>
        </div>
    );
};
