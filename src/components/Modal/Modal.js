import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export class ItemModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal fullscreen={true} show={this.props.show} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.data.itemname}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
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