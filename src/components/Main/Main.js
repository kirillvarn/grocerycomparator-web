import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { Card, Form, Container, Row, Col, Pagination } from 'react-bootstrap'
import './Main.css'
import { items } from '../store/index'
import { URL } from '../../credentials'
// COMPONENTS
import ItemModal from '../Modal/Modal'

const parameters = {
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*'
    // 'Content-Type': 'application/x-www-form-urlencoded',
  }
}

export default function Main() {
    const [itemData, setItemData] = useRecoilState(items);
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState({});
    const [showItemCount, setShowItemCount] = useState(64);

    useEffect(() => {
        fetch(URL, parameters)
        .then(res => res.json())
        .then((result) => {
            setItemData(result[1]);
            //setDatesData(result[0]);
        }, 
        (error) => {
            console.log(error)
        });
    });

    const openModal = (name) => {
        setModalData({itemname: name})
        setModalShow(true)
    }

    const closeModal = () => {
        setModalShow(false)
    }

    return (
        <div>
            <Container className="mt-5">
                <Form>
                    <Row>
                        <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Enter a name..." />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Price</Form.Label>
                            <Form.Control placeholder="Enter price..." />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Shop</Form.Label>
                            <Form.Control placeholder="Enter a shop..." />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex" controlId="formBasicEmail">
                            <Form.Check 
                                type="switch"
                                id="custom-switch"
                                label="Is discount"
                                className="align-self-end mb-2"
                            />
                        </Form.Group>
                    </Row>
                    <Row className="justify-items-end">
                        <Col md={11}></Col>
                        <Col md={1}>
                            <select value={showItemCount} onChange={e => setShowItemCount(e.target.value)} className="form-select" aria-label="Default select example">
                                <option value="24">24</option>
                                <option value="64">64</option>
                                <option value="128">128</option>
                                <option value="256">256</option>
                            </select>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <hr/>
            <ItemModal  show={modalShow} data={modalData} close={closeModal}></ItemModal>
            <Container fluid className="d-flex flex-wrap justify-content-around mt-2" >
                {Object.keys(itemData).slice(0, showItemCount).map((item, index) => (
                    <Card onClick={() => openModal(item)} key={index} style={{ width: '14rem' }} className="mb-2 shadow-sm item-card">
                        <Card.Body>
                        <Card.Title>{item}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted text-capitalize">{itemData[item]['shop']}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        </div>
    )
}