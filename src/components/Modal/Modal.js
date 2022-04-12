import React, { Component } from 'react';
import { URL } from '../../credentials'
import { Modal, Button } from 'react-bootstrap';

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

export class ItemModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plotData: []
        }
    }


    componentDidMount() {
        this.fetchProductPrice(this.props.item.id, this.props.item.itemname)
    }

    async fetchProductPrice(id, name) {
        const response = await fetch(URL + `/products/${id}`, parameters);
        const json = await response.json()
        const data = { plotData: json[name].map((index, item) => ({ y: index, x: item })) }
        console.log(data)
    }

    render() {
        return (
            <Modal fullscreen={true} show={this.props.show} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.item.itemname}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.close}>Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ItemModal