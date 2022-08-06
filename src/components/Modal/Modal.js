import React, { useEffect, useState } from 'react';
import { config } from '../../credentials'
import { Modal, Button, Row, Col } from 'react-bootstrap';

import Table from '../Table/Table';

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
    const [showTable, setShowTable] = useState(false)

    useEffect(() => {
        fetchProductPrice(props.item.id)
    }, [])

    // useEffect(() => {
    //     getPriceChanges()
    // }, [priceList])

    const fetchProductPrice = async (id) => {
        const null_q = (id === props.item.itemname) ? "?null_id=true" : ""
        const response = await fetch(URL + `/products/${id}${null_q}`, parameters);

        await response.json()
            .then((fetched) => {
                console.log(fetched)

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

    return (
        <Modal fullscreen={true} show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>{name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <Col>
                        {showTable ? <Table data={{'prices': priceList, 'discounts': discountList, 'dates': dateList}} cols={['date', 'price', 'deviation']} /> : null}
                    </Col>
                    <Col></Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.close}>Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal>
    )
}