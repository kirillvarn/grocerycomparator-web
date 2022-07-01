import React, { useState, useEffect } from 'react';
import { Table as BTable } from 'react-bootstrap';

import "./Table.css";

function Table(props) {
    const keys = Object.keys(props.data);

    const calculateDeviation = (prices) => {
        const pricesLen = prices.length;

        if (pricesLen == 1) return ["N/A"] // guard in case there is only one price

        return prices.map((item, index) => {
            if (index == 0) {
                return 0;
            }
            let deviation;
            if (prices[index-1] != 0) {
                deviation = (prices[index] / prices[index - 1]) * 100 - 100;
            } else {
                deviation = 100;
            }

            return Math.round(deviation * 100) / 100;
        });
    };

    const getColorValue = (percent) => {
        let style;
        if (percent > 0) {
            return {
                backgroundColor: `rgba(220, 0, 0, ${percent / 100})`
            };
        } else {
            return {
                backgroundColor: `rgba(0, 220, 0, ${percent*-1 / 100})`
            };
        }
    };

    const deviations = calculateDeviation(Object.values(props.data));

    return (<BTable bordered hover>
        <thead>
            <tr>
                {props.cols.map(i => <th>{i}</th>)}
            </tr>
        </thead>
        <tbody>
            {keys.map((i, index) => {
                return (<tr>
                    <td>{i == 'initial_products' ? '2022-03-06' : i}</td>
                    <td>{Math.round(props.data[i] * 100) / 100}</td>
                    <td style={getColorValue(deviations[index])}>{deviations[index]}{deviations.length > 1 ? "%" : ""}</td>
                </tr>)
            })}
        </tbody>
    </BTable>);
}

export default Table;