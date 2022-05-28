import React, { useState, useEffect } from 'react';
import "./Error.css";

export default function Error(props) {
    return (
        <div className="error_container">
            <p className="error_message">{props.message}</p>
        </div>
    )
}
