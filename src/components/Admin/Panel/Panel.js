import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';

import { config } from '../../../credentials';

// Components
import Status from './Status';
const URL = config.API;

export default function Panel() {
  const [serverStatus, setServerStatus] = useState('OK');
  const [lastDate, setLastDate] = useState(0);
  const [dateArray, setDateArray] = useState([]);

  const timeoutChecker = () => {
    checkServer();
    setTimeout(timeoutChecker, 10 * 1000);
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
                  const maxDateArray =
                    dateArray.map(element => {
                      if (element !== 'initial_products' && element !== 'updatedates') {
                        return new Date(element)
                      };
                    });
                  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                  setDateArray(maxDateArray.map(date => {
                    date.toLocaleDateString('en-US', options)
                  }));
                  var maxDate = new Date(Math.max.apply(null, maxDateArray));
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
      <Row>
        <Col>
          <Status status={serverStatus} />
        </Col>
        <Row>
          <Col className="card">
            <h1>Last parsed date:</h1>
            <h1>{lastDate}</h1>
            <a id="date-full-list">Full list</a>
          </Col>
          <Col className="card"></Col>
        </Row>
      </Row>
    </Container>
  )
}
