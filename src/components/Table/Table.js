import React, { useState, useEffect } from 'react';
import { Table as BTable } from 'react-bootstrap';



import "./Table.css";

function Table(props) {
    const showDiscounted = props.showDiscount;

    const [data, setData] = useState(props.data)
    const [deviations, setDeviations] = useState([])


    const calculateDeviation = (prices) => {
        const pricesLen = prices.length;

        if (pricesLen == 1) return ["N/A"] // guard in case there is only one price

        return prices.map((item, index) => {
            if (index == 0) {
                return 0;
            }
            let deviation;
            if (prices[index - 1] != 0) {
                deviation = (prices[index] / prices[index - 1]) * 100 - 100;
            } else {
                deviation = 100;
            }

            return Math.round(deviation * 100) / 100;
        });
    };

    // useEffect(() => {
    //     setDeviations(calculateDeviation(Object.values(prices)))
    // }, [prices])

    const getColorValue = (percent) => {
        if (percent > 0) {
            return {
                backgroundColor: `rgba(220, 0, 0, ${percent / 100})`
            };
        } else {
            return {
                backgroundColor: `rgba(0, 220, 0, ${percent * -1 / 100})`
            };
        }
    };

    useEffect(() => {
        if (showDiscounted) {
            setData(props.data);
        } else {
            const new_data = props.data.filter(entry => entry['discount'] == false);
            setData(new_data);
        }
    }, [props.showDiscount])

    const colName = {'inserted_at': 'Date'}

    const formatData = (data) => {
        if (typeof data == 'number') {
            return Math.round(data * 100, 2)/100;
        }

        let date = Date.parse(data);

        if (typeof date == 'number') {
            date = new Date(date);
            return `${('0' + date.getDate()).slice(-2)}.${("0" + date.getMonth()).slice(-2)}.${date.getFullYear()}`
        } else {
            return data;
        }

    }


    return (<BTable hover className="shadow-sm border price-table">
        <thead className="bg-dark text-light">
            <tr>
                {props.cols.map((col, index) => <th className="rounded-top" key={index}>{colName[col] || col}</th>)}
            </tr>
        </thead>
        <tbody>
            {data.map((entry, index) =>
                <tr key={index}>
                    {props.cols.map((col, col_index) =>
                        <td key={col_index}>{formatData(entry[col])}</td>
                    )}
                </tr>
            )}
        </tbody>
    </BTable>);
}

export default Table;