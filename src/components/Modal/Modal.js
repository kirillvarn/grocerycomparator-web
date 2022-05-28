import React, { useEffect, useState }  from 'react';
import { config } from '../../credentials'
import { Modal, Button } from 'react-bootstrap';

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
    const [plotData, setPlotData] = useState([])
    const [priceList, setPriceList] = useState([])

    useEffect(() => {
        fetchProductPrice(props.item.id, props.item.itemname)
    })
    useEffect(() => {
        const list = plotData.map((index, item) => <h1 key={index}>{item[index]}</h1>);
        setPriceList(list)
    }, [plotData])

    const fetchProductPrice = async (id, name) => {
        const response = await fetch(URL + `/products/${id}`, parameters);
        const json = await response.json()
        const data = json[name]
        setPlotData(data)
    }

    return (
        <Modal fullscreen={true} show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>{props.item.itemname}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {priceList}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.close}>Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal>
    )
}