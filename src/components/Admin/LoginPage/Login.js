import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import "./Login.css";

import { config } from '../../../credentials';

const repo = config.Repo['Full-access'];
const URL = config.API;

function Login() {
    const login = (event) => {
        event.preventDefault();
        const username = event.target[0].value;
        const password = event.target[1].value;
        const keepalive = event.target[2].checked;
        const data ={ "username": username, "password": password, "keep_logged": keepalive }
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
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
                else {
                    throw Error('Something went wrong');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (<div className="login_container">
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
            <Button className="login_btn" variant="primary" type="submit">
                Login
            </Button>
        </form>
    </div>);
}

export default Login;