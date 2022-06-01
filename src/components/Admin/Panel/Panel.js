import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

import { config } from '../../../credentials';
import * as Helper from '../../Helpers.js';

// Components
import Status from './Status';
import Error from '../../Error/Error'

const URL = config.API;
const PARSE_KEY = config.PARSE_TOKEN;
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export default function Panel() {
  const [serverStatus, setServerStatus] = useState('OK');
  const [lastDate, setLastDate] = useState(0);
  const [dateArray, setDateArray] = useState([]);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const timeoutChecker = () => {
    checkServer();
    setTimeout(timeoutChecker, 300 * 1000);
  }

  const getLastDate = () => {
    fetch(`${URL}/dates`, { headers: { 'Content-Type': 'application/json' }, method: 'GET' })
      .then(
        (resp) => {
          if (resp.ok) {
            resp.json()
              .then(
                (resp) => {
                  const dateArray = resp.filter((e) => e !== 'initial_products' && e !== 'updatedates')
                  let dateDict = new Object();
                  const maxDateArray =
                    dateArray.map(element => {
                      if (element !== 'initial_products' && element !== 'updatedates') {
                        dateDict[element] = new Date(element);
                      };
                    });
                  setDateArray(dateDict);
                  var maxDate = new Date(Math.max.apply(null, Object.values(dateDict)));
                  setLastDate(maxDate.toLocaleDateString('en-US', options));
                }
              )
          }
        })
      .catch(
        (e) => console.log(e)
      );
  }

  const checkServer = () => {
    fetch(`${URL}`, { headers: { 'Content-Type': 'application/json' }, method: 'GET' })
      .then(
        (resp) => {
          if (resp.status !== 200) setServerStatus('ERROR');
          if (resp.status === 200) setServerStatus('OK');
        })
      .catch(
        (e) => {
          setServerStatus('ERROR');
        });
  }

  useEffect(
    () => {
      timeoutChecker();
      getLastDate();
    }, [])

  return (
    <Container className="panel_container">
      {error ? <Error message={error} /> : null}
      <Modal className="h-75 mt-4 p-4" centered scrollable show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Full list of parse dates!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table" id="fullListTable">
            <thead>
              <tr>
                <th>Table name</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(dateArray).map((item) => {
                return (
                  <tr>
                    <td>{item[0]}</td>
                    <td>{item[1].toLocaleDateString('en-US', options)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col>
          <Status status={serverStatus} />
        </Col>
      </Row>
      <Row>
        <Col className="card">
          <h1>Last parsed date:</h1>
          <h1>{lastDate}</h1>
          <a id="date-full-list" onClick={() => setShowModal(true)}>Full list</a>
        </Col>
        <Col className="card center-flex">
        </Col>
      </Row>
    </Container>
  )
}
