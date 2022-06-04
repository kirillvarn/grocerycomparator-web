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
    const [name, setName] = useState("")

    useEffect(() => {
        fetchProductPrice(props.item.id)
    }, [])

    useEffect(() => {
        getPriceChanges()
    }, [priceList])

    const fetchProductPrice = async (id) => {
        const response = await fetch(URL + `/products/${id}`, parameters);
        const json = await response.json()
        const key = Object.keys(json)
        const prices = json[key]
        setName(key[0])
        setPriceList(prices)
    }

    const getPriceChanges = () => {
        
        console.log(priceList)
    }

    return (
        <Modal fullscreen={true} show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>{name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <Col>
                        <Table data={priceList} cols={['date', 'price']} />
                    </Col>
                    <Col></Col>
                </Row>
                {/*Object.keys(priceList).map(i => {
                    return <div><span>{i}: {priceList[i]}</span></div>
                })*/}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.close}>Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal>
    )
}