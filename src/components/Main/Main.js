import React, { useEffect, useState } from 'react'
import { Card, Form, Container, Row, Col, Pagination } from 'react-bootstrap'
import './Main.css'
import { config } from '../../credentials'

// COMPONENTS

import ItemModal from '../Modal/Modal'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const URL = config.API;

const parameters = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
    }
}

export default function Main() {
    const [products, setProducts] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [modalItem, setModalItem] = useState({});
    const [showItemCount, setShowItemCount] = useState(64);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false);
    const [searchString, setSearchString] = useState("");
    const [shopString, setShopString] = useState("");

    useEffect(() => {
        setLoading(true);
        fetchProducts()
    }, [showItemCount, page, searchString, shopString]);

    const fetchProducts = async () => {
        const response = await fetch(`${URL}/products?limit=${showItemCount}&page=${page}&s=${searchString}&shop=${shopString}`, parameters);
        const json = await response.json()
        setProducts(json["data"])
        setTotalPages(json["pages"])
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
        <div className="content" style={{ backgroundColor: "#f1f1f1" }}>
            <Header />
            <Container className="mt-2 shadow">
                <Form>
                    <Row style={{ alignItems: "end" }}>
                        <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control className="mb-2" onChange={e => setSearchString(e.target.value)} placeholder="Enter a name..." />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Shop</Form.Label>
                            <Form.Control className="mb-2" onChange={e => setShopString(e.target.value)} placeholder="Enter a shop..." />
                        </Form.Group>
                        <Col md={1} className="mb-3">
                            <select value={showItemCount} onChange={e => setShowItemCount(e.target.value)} className="form-select mb-2" aria-label="Default select example">
                                <option value="24">24</option>
                                <option value="64">64</option>
                                <option value="128">128</option>
                                <option value="256">256</option>
                            </select>
                        </Col>
                    </Row>
                </Form>
            </Container>
            {modalShow ? <ItemModal show={modalShow} item={modalItem} close={closeModal}></ItemModal> : null}
            <div className={loading ? "loadingIcon" : "hidden"}></div>
            <div className="border-top">
                <Container fluid className="d-flex flex-wrap justify-content-around pt-2 w-75" style={{ minHeight: '50vh' }} >
                    {Object.keys(products).map((item, index) => {
                        return (<Card onClick={() => openModal(products[item]["name"], products[item]["id"])} key={index} style={{ width: '14rem' }} className="mb-2 shadow-sm item-card">
                            <Card.Body>
                                <Card.Title>{products[item]["name"]}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted text-capitalize">{products[item]['shop']}</Card.Subtitle>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted font-weight-bold"> Price: {Math.round(products[item]['price'] * 100) / 100}&euro;</small>
                            </Card.Footer>
                        </Card>
                        )
                    }
                    )}
                </Container>
            </div>
            {loading ? null : <Pagination className="justify-content-center py-3 m-0">
                {page > 1 ? <Pagination.Prev onClick={() => setPage(page - 1)} /> : <Pagination.Prev disabled></Pagination.Prev>}
                <Pagination.Item active>{page}</Pagination.Item>
                {page != totalPages + 1 && totalPages != 0 ? <Pagination.Ellipsis disabled /> : null}
                {page != totalPages + 1 && totalPages != 0 ? <Pagination.Item onClick={() => setPage(totalPages + 1)}> {totalPages + 1} </Pagination.Item> : null}
                {page == totalPages + 1 ? <Pagination.Next disabled /> : <Pagination.Next onClick={() => setPage(page + 1)} />}
            </Pagination>}
            <Footer />
        </div>
    )
}
