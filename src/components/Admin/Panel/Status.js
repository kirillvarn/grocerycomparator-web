import React, { useState, useEffect } from 'react';

import "./Panel.css";

function Status(props) {
    const [className, setClassName] = useState("card status-ok");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if (props.status === 'OK') {
            setClassName("card status-ok");
            setMsg("Server is running!");
        } else {
            setClassName("card status-error");
            setMsg("Server is down!");
        }
    }, [props.status])
    return (
        <div className={className}>
            <h1>{msg}</h1>
        </div>
    );
}

export default Status;