import React, { useState, useEffect } from 'react';
import { Table as BTable } from 'react-bootstrap';



import "./Table.css";

function Table(props) {
    const calculateAndSetDeviation = (data) => {
        if (data.length == 1) data[0].deviation = 'N/A';

        data =
            data.map((entry, index) => {
                if (index == 0) entry.deviation = 0;

                if (index > 0) {
                    const prevItemPrice = data[index - 1].price;
                    const itemPrice     = data[index].price;
                    const deviation     = itemPrice/prevItemPrice*100 - 100;

                    entry.deviation = deviation;
                }

                return entry;
            });
        console.log(data)
        return data;
    };

    const showDiscounted = props.showDiscount;

    const [data, setData] = useState(() => {return calculateAndSetDeviation(props.data)})
    // const [deviations, setDeviations] = useState([])
    const td = {
        'inserted_at': inserted_attd,
        'price': pricetd,
        'deviation': deviationtd,
    }

    useEffect(() => {
        calculateAndSetDeviation(data);
    }, [data])

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
        if (!showDiscounted) {
            setData(props.data);
        } else {
            const new_data = props.data.filter(entry => entry['discount'] == false);
            setData(new_data);
        }
    }, [props.showDiscount])

    const colName = {'inserted_at': 'Date'}

    function inserted_attd(data) {
        const date = new Date(data);
        return `${('0' + date.getDate()).slice(-2)}.${("0" + date.getMonth()).slice(-2)}.${date.getFullYear()}`
    }

    function pricetd(data) {
        return Math.round(data * 100)/100;
    }

    function deviationtd(data) {
        const number =  Math.round(data * 100)/100;
        const string = number > 0 ? `+${number}` : `${number}`;
        return string;
    }

    return (<BTable hover className="shadow-sm border price-table">
        <thead className="bg-dark text-light">
            <tr>
                {props.cols.map((col, index) => <th className="rounded-top" key={index}>{colName[col] || col}</th>)}
            </tr>
        </thead>
        <tbody>
            {data.map((entry, index) =>
                <tr key={index} style={getColorValue(entry.deviation)}>
                    {props.cols.map((col, col_index) =>
                        {
                            var fn = td[col];
                            return <td key={col_index}>{fn && fn(entry[col]) || entry[col]}</td>
                        }
                    )}
                </tr>
            )}
        </tbody>
    </BTable>);
}

export default Table;