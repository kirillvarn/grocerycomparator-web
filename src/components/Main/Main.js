import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { Card, Form, Container, Row, Col, Pagination } from 'react-bootstrap'
import './Main.css'
import { items } from '../store/index'
// import { URL } from '../../credentials'
// COMPONENTS
import ItemModal from '../Modal/Modal'
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

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

export default function Main() {
    const [products, setProducts] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [modalItem, setModalItem] = useState({});
    const [showItemCount, setShowItemCount] = useState(64);
    const [dates, setDates] = useState([])
    const [pageCount, setPageCount] = useState(1)
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (Object.keys(products).length == 0)
            setPageCount(Math.ceil(Object.keys(products).length/showItemCount))
        fetchProducts()
    }, [products]);

    useEffect(() => {
        fetchDates()
    }, [dates]);

    useEffect(() => {
        if (Object.keys(products).length != 0)
            setPageCount(Math.ceil(Object.keys(products).length/showItemCount))
    }, [showItemCount]);

    const fetchDates = async () => {
        const response = await fetch(URL, parameters);
        const json = await response.json()
        setDates(json)
    }
    const fetchProducts = async () => {
        const response = await fetch(URL + "/products", parameters);
        const json = await response.json()
        setProducts(json)
    }

    const openModal = (name, id) => {
        setModalItem({itemname: name, id: id})
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
            {modalShow ? <ItemModal  show={modalShow} item={modalItem} close={closeModal}></ItemModal> : null}
            <Container fluid className="d-flex flex-wrap justify-content-around mt-2" >
                {Object.keys(products).slice(showItemCount*(page-1), showItemCount * page).map((item, index) => (
                    <Card onClick={() => openModal(products[item]["name"], products[item]["id"])} key={index} style={{ width: '14rem' }} className="mb-2 shadow-sm item-card">
                        <Card.Body>
                        <Card.Title>{products[item]["name"]}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted text-capitalize">{products[item]['shop']}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
            <Pagination className="justify-content-center mt-2">
                <Pagination.First onClick={() => setPage(3)}/>
                {page > 3 ? <Pagination.Prev onClick={() => setPage(page-1)}/> : <Pagination.Prev disabled/>}
                {page-3 >= 3 ? <Pagination.Ellipsis disabled/> : null}
                {range(page - 2, page + 2).map(i => {
                    if (i - 2 >= 1 & i <= pageCount) {
                        if (i == page) {
                            return <Pagination.Item active onClick={() => setPage(i)} key={i}>{i-2}</Pagination.Item>
                        } else {
                            return <Pagination.Item onClick={() => setPage(i)} key={i}>{i-2}</Pagination.Item>
                        }
                    } 
                })}
                {pageCount-2 - page > 2 ? <Pagination.Ellipsis disabled/> : null}
                {page <= pageCount-1 ? <Pagination.Next onClick={() => setPage(page+1)} /> : <Pagination.Next disabled/>}
                <Pagination.Last onClick={() => setPage(pageCount)}/>
            </Pagination>
        </div>
    )
}