import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { Card, Form, Container, Row, Col, Pagination } from 'react-bootstrap'
import './Main.css'
import { items } from '../store/index'
import { URL } from '../../credentials'
// COMPONENTS

import ItemModal from '../Modal/Modal'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


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

export default function Main() {
    const [products, setProducts] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [modalItem, setModalItem] = useState({});
    const [showItemCount, setShowItemCount] = useState(64);
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchProducts()
    }, [page]);

    const fetchProducts = async () => {
        const response = await fetch(`${URL}/products?limit=${showItemCount}&page=${page}`, parameters);
        const json = await response.json()
        setProducts(json)
        setLoading(false);
    }

    const openModal = (name, id) => {
        setModalItem({ itemname: name, id: id })
        setModalShow(true)
    }

    const closeModal = () => {
        setModalShow(false)
    }

    return (
        <div>
            <Header />
            <Container className="mt-5">
                <Form>
                    <Row>
                        <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Enter a name..." />
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
            <hr />
            {modalShow ? <ItemModal show={modalShow} item={modalItem} close={closeModal}></ItemModal> : null}
            <div className={loading ? "loadingIcon" : "hidden"}></div>
            <Container fluid className="d-flex flex-wrap justify-content-around mt-2" >
                {Object.keys(products).map((item, index) => (
                    <Card onClick={() => openModal(products[item]["name"], products[item]["id"])} key={index} style={{ width: '14rem' }} className="mb-2 shadow-sm item-card">
                        <Card.Body>
                            <Card.Title>{products[item]["name"]}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted text-capitalize">{products[item]['shop']}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
            <Pagination className="justify-content-center mt-2">
                {page > 1 ? <Pagination.Prev onClick={() => setPage(page - 1)} /> : <Pagination.Prev disabled></Pagination.Prev>}
                <Pagination.Item active>{page}</Pagination.Item>
                <Pagination.Next onClick={() => setPage(page + 1)} />
            </Pagination>
            <Footer />
        </div>
    )
}