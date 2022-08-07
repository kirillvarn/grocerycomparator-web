import React, { useState, useEffect } from 'react'

// componenets
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import ListItem from './ListItem/ListItem'

export default function Compare() {
    const [productList, setProductList] = useState([])
    const [productName, setProductName] = useState("")

    useEffect(() => {

    }, [productList])

    const addNewProduct = event => {
        if (productName !== "") {
            event.preventDefault();
            let newProductList = [...productList]
            newProductList.push(productName)
            setProductList(newProductList)
            setProductName("")
        }
    }

    const handleFormChange = event => {
        setProductName(event.target.value)
    }

    const removeProduct = (index) => {
        let newProductList = [...productList]
        newProductList.splice(index, 1)
        setProductList(newProductList)
    }

    return (
        <div className="content" style={{ backgroundColor: "#f1f1f1" }}>
            <Header />
            <div className="container rounded shadow-sm mt-5 p-4" style={{ backgroundColor: "white" }}>
                <h1 className="title">Compare</h1>
                <h5 className="text-dark">Write down items you'd like to compare</h5>
                <p className="text-muted">Search works with Estonian language only</p>

                <div className="d-flex align-items-start flex-wrap">
                    {productList.map((product, index) => { return <ListItem key={index} index={index} name={product} removeProduct={removeProduct} /> })}

                    <InputGroup className="mb-3 w-25">
                        <Form.Control value={productName} type="text" id="new_products_form" onChange={handleFormChange} />
                        <Button onClick={addNewProduct} variant="outline-dark">
                            +
                        </Button>
                    </InputGroup>
                </div>
                <Form>
                    <h4>Shops</h4>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Rimi"
                        inline
                    />
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Prisma"
                        inline
                    />
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Coop"
                        inline
                    />
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Maxima"
                        inline
                    />
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Selver"
                        inline
                    />
                </Form>
                <Button variant="outline-dark" className="mt-4">Compare</Button>
            </div>
            <Footer />
        </div>
    )
}
