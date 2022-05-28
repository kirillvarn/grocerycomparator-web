import React, { useState, useEffect } from 'react';

//  Components
import Login from '../LoginPage/Login';
import Panel from '../Panel/Panel';

function MainAdmin() {
    const [response, setResponse] = useState(false)
    const setLoginResponse = (resp) => {
        setResponse(resp);
    }

    return (
        <div>
            {response ? <Panel /> : <Login loginResponse={setLoginResponse} />}
        </div>
    );
}

export default MainAdmin;