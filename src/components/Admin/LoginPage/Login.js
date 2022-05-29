import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import "./Login.css";

import { config } from '../../../credentials';

import Error from '../../Error/Error';

const URL = config.API;

function Login(props) {
    const [loginResponse, setLoginResponse] = useState({});
    const [error, setError] = useState("");

    const login = (event) => {
        event.preventDefault();
        const username = event.target[0].value;
        const password = event.target[1].value;
        const keepalive = event.target[2].checked;
        const data = { "username": username, "password": password, "keep_logged": keepalive }
        fetch(`${URL}/user`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data)
        })
            .then(function (response) {

                if (response.ok) {
                    response.json()
                        .then(function (response) {
                            setLoginResponse(response)
                        })
                        .catch(function (error) {
                            setError("Something wrong on the server-side.")
                        });
                }
                else {
                    setError("Something wrong on the server-side.")
                }
            })
            .catch(function (error) {
                setError("Something wrong on the server-side.")
            });
    }

    useEffect(() => {
        if (loginResponse.response && loginResponse.response.status == 'error') {
            setError(loginResponse['response']['message']);
        } else if (loginResponse.response && loginResponse.response.status == 'ok') {
            props.loginResponse(true);
        } else {
            setError(null);
        }
    }, [loginResponse])

    return (<div className="login_container">
        {error ? <Error message={error} /> : null}
        <form onSubmit={login}>
            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control name="username"></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password"></Form.Control>
            </Form.Group>
            <Form.Group controlId="keep_logged">
                <Form.Check name="keep_logged" type="checkbox" label="Remember me!" />
            </Form.Group>
            <Button className="login_btn" variant="dark" type="submit">
                Login
            </Button>
        </form>
    </div>);
}

export default Login;