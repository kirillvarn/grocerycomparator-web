//import React, { useState, useEffect } from 'react';
import "./Back.css";
import { Button } from 'react-bootstrap';

function Back() {
    return (
        <Button className="back_btn" size='lg' href="/grocerycomparator-web" variant='outline-dark'>
            Back
        </Button>
    );
}

export default Back;