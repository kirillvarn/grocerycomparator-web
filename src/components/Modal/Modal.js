import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

const URL = "http://127.0.0.1:8080"
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
        const response = await fetch(URL + `/products/${name}/${id}`, parameters);
        const json = await response.json()
        const data = {plotData: json[name].map((index, item) => ({y: index, x: item}))}
        this.renderChart(data.plotData)
    }

    renderChart(data) {
        new Chart("chart", {
            type: "scatter",
            data: {
                datasets: [{
                pointRadius: 4,
                pointBackgroundColor: "rgba(0,0,255,1)",
                data: data
                }]
            },
            scales: {
                y: {
                    max: 80,
                    min: 20
                }
            }
        });
    }

    render() {
        return (
            <Modal fullscreen={true} show={this.props.show} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.item.itemname}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <canvas id="chart"></canvas>
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