import React, { useState, useEffect } from 'react';
import { Table as BTable } from 'react-bootstrap';

import "./Table.css";

function Table(props) {
    const keys = Object.keys(props.data).sort().reverse();
    return (<BTable bordered hover>
        <thead>
            <tr>
                {props.cols.map(i => <th>{i}</th>)}
            </tr>
        </thead>
        <tbody>
            {keys.map((i) => {
                return (<tr>
                    <td>{i == 'initial_products' ? '2022-03-06': i}</td>
                    <td>{Math.round(props.data[i] * 100)/100}</td>
                </tr>)
            })}
        </tbody>
    </BTable>);
}

export default Table;