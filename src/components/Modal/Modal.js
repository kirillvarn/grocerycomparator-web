import React, { useEffect, useState } from 'react';
import { config } from '../../credentials'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

import { ResponsiveContainer, Tooltip, Line, LineChart, XAxis, CartesianGrid, YAxis } from 'recharts';

import Table from '../Table/Table';

import "./Modal.css"

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

export default function ItemModal(props) {
    const [priceList, setPriceList] = useState({})
    const [discountList, setDiscountList] = useState({})
    const [dateList, setDateList] = useState({})
    const [name, setName] = useState("")
    const [series, setSeries] = useState({})
    const [showTable, setShowTable] = useState(false)
    const [hideDiscount, setHideDiscount] = useState(false)


    const aggregateSeries = () => {
        const data = priceList.map((_, index) => {
            return { date: dateList[index], price: Math.round(priceList[index] * 100) / 100, discount: discountList[index] }
        })
        return data
    }

    useEffect(() => {
        fetchProductPrice(props.item.id)

    }, [])

    useEffect(() => {
        if (Object.keys(priceList).length != 0) setSeries(aggregateSeries())
    }, [discountList])

    useEffect(() => {
        if (hideDiscount) {
            let l_series = [...series];
            const new_series = l_series.filter((item) => item.discount === false)
            setSeries(new_series)
        } else {
            if (Object.keys(priceList).length != 0) setSeries(aggregateSeries())
        }
    }, [hideDiscount])

    const fetchProductPrice = async (id) => {
        const null_q = (id === props.item.itemname) ? "?null_id=true" : ""
        const response = await fetch(URL + `/products/${id}${null_q}`, parameters);

        await response.json()
            .then((fetched) => {
                const name = Object.keys(fetched)[0]
                setName(name)

                const prices = Object.keys(fetched[name]).map((key, index) => {
                    return fetched[name][key]['price']
                })
                const discounts = Object.keys(fetched[name]).map((key, index) => {
                    return fetched[name][key]['discount']
                })
                setDateList(Object.keys(fetched[name]))
                setPriceList(prices);
                setDiscountList(discounts);
            })
            .then(() => {
                setShowTable(true)
            });
    }

    const toggleDiscountedProducts = event => {
        setHideDiscount(event.target.checked);
    }

    return (
        <Modal fullscreen={true} show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>{name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {showTable ?
                    <Row className="w-100">
                        <Col className="rounded-top border m-0 p-0 overflow-hidden w-100">
                            <Table showDiscount={hideDiscount} data={{ 'prices': priceList, 'discounts': discountList, 'dates': dateList }} cols={['date', 'price', 'deviation']} />
                        </Col>
                        <Col>
                            <div className="container h-100">
                                <h2>Settings</h2>
                                <div className="form-switch d-flex align-items-center mt-4">
                                    <input onChange={toggleDiscountedProducts} id="discount-check" className="form-check-input" type="checkbox" />
                                    <label style={{ marginLeft: "12px" }} htmlFor="discount-check">Hide discounted products</label>
                                </div>
                                <h2 className="mt-5">Price change graph</h2>
                                <ResponsiveContainer width="100%" height={340} className="price_chart mt-4 shadow-sm border rounded">
                                    <LineChart
                                        data={series}
                                        margin={{
                                            top: 10,
                                            right: 10,
                                            left: -10,
                                            bottom: 10,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis dataKey="price" padding={{ top: 20 }} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 4 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Col>
                    </Row>
                    :
                    <div className="loadingIcon"></div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.close}>Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal>
    )
}