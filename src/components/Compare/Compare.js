import React, { useState, useEffect } from 'react'

// componenets
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import { config } from "../../api"

import ListItem from './ListItem/ListItem'

const URL = config.API;

const parameters = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
    }
}

export default function Compare() {
    const [productList, setProductList] = useState([])
    const [shopList, setShopList] = useState([])
    const [fetchedData, setFetchedData] = useState([])
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

    const toggleSwitchShop = event => {
        const shops = [...shopList]
        if (event.target.checked) {
            shops.push(event.target.id)
        } else {
            shops.splice(shops.indexOf(event.target.id), 1)
        }
        setShopList(shops);
    }

    const fetchProducts = async () => {
        const product_string = productList.join();
        const shop_string = shopList.join();
        const url = `${URL}/compare${'?products=' + product_string}${'&shops=' + shop_string}`

        const response = await fetch(url, parameters)
        await response.json()
            .then((data) => {
                const result = data.reduce(function (r, a) {
                    r[a.shop] = r[a.shop] || [];
                    r[a.shop].push(a);
                    return r;
                }, Object.create(null));
                setFetchedData(result)
            })
    }

    function sum(obj) {
        var sum = 0;
        for (var el in obj) {
            if (obj.hasOwnProperty(el)) {
                sum += parseFloat(obj[el].price);
            }
        }
        return sum;
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
                        onChange={toggleSwitchShop}
                        id="rimi"
                        label="Rimi"
                        inline
                    />
                    <Form.Check
                        type="switch"
                        onChange={toggleSwitchShop}
                        id="prisma"
                        label="Prisma"
                        inline
                    />
                    <Form.Check
                        type="switch"
                        onChange={toggleSwitchShop}
                        id="coop"
                        label="Coop"
                        inline
                    />
                    <Form.Check
                        type="switch"
                        onChange={toggleSwitchShop}
                        id="maxima"
                        label="Maxima"
                        inline
                    />
                    <Form.Check
                        type="switch"
                        onChange={toggleSwitchShop}
                        id="selver"
                        label="Selver"
                        inline
                    />
                </Form>
                <Button variant="outline-dark" onClick={fetchProducts} className="mt-4">Compare</Button>
            </div>
            {fetchedData.length != 0 ?
                <div className="container rounded shadow-sm mt-3 p-4 d-flex" style={{ backgroundColor: "white" }}>
                    {Object.keys(fetchedData).map((item, index) => {
                        return <div className="p-3 rounded border shadow-sm" style={{ marginRight: "12px" }} key={index}>
                            <h3 className="text-capitalize">{item}</h3>
                            <div>
                                {fetchedData[item].map((item, index) => {
                                    return <div key={index} className="d-flex justify-content-between">
                                        <span className={item.discount ? "text-warning" : "text-dark"} style={{ marginRight: "16px" }}>{item.name}</span>
                                        <span>{item.price}</span>
                                    </div>
                                })}
                                <hr />
                                <span> Total: </span>
                                <span> {Math.round(sum(fetchedData[item]) * 100) / 100}</span>
                            </div>
                        </div>
                    })}
                </div>
                : null}
            <Footer />
        </div>
    )
}
