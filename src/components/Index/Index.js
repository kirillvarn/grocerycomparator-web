import React from 'react'

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { Button } from 'react-bootstrap';

import "./index.css";
import { Link } from 'react-router-dom';

export default function Index() {
    return (
        <div class="content">
            <Header />
            <div className="align-self-center mt-auto">
                <h1 style={{ fontWeight: 300 }}>Hello!</h1>
            </div>
            <div className="d-flex mt-auto flex-column align-items-center">
                <Link to="/list">
                    <Button className="my-3 p-4" variant="outline-dark">List of products</Button>
                </Link>
                <Link to="/compare">
                    <Button className="my-3 p-4" variant="outline-dark">Basket comparing</Button>
                </Link>
                <Link to="/stat">
                    <Button className="my-3 p-4" variant="outline-dark">Statistics</Button>
                </Link>
            </div>
            <Footer />
        </div>
    )
}
