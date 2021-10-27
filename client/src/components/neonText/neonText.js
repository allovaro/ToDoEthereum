import React from 'react';
import './neonText.css';

function NeonText(props) {
    return (
        <h3 className="neonText">{props.text}</h3>
    );
}

export default NeonText;
