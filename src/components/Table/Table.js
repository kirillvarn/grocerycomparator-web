import React, { useState, useEffect } from 'react';
import { Table as BTable } from 'react-bootstrap';



import "./Table.css";

function Table(props) {
    const showDiscounted = props.showDiscount;

    const p_dates = props.data['dates']
    const p_prices = props.data['prices']
    const p_discounts = props.data['discounts']

    const [dates, setDates] = useState(p_dates)
    const [prices, setPrices] = useState(p_prices)
    const [discounts, setDiscounts] = useState(p_discounts)
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

    useEffect(() => {
        setDeviations(calculateDeviation(Object.values(prices)))
    }, [prices])

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
            const l_prices = discounts.map((discount, index) => {
                if (!discount) return prices[index]
            }).filter(value => value !== undefined)
            const l_dates = discounts.map((discount, index) => {
                if (!discount) return dates[index]
            }).filter(value => value !== undefined)
            const l_discounts = discounts.filter(value => value !== true)

            setDates(l_dates)
            setPrices(l_prices)
            setDiscounts(l_discounts)
        } else {
            setDates(p_dates)
            setPrices(p_prices)
            setDiscounts(p_discounts)
        }
    }, [props.showDiscount])


    return (<BTable hover className="shadow-sm border price-table">
        <thead className="bg-dark text-light">
            <tr>
                {props.cols.map((i, index) => <th className="rounded-top" key={index}>{i}</th>)}
            </tr>
        </thead>
        <tbody>
            {dates.map((i, index) => {
                const discount = discounts[index] ? "discounted" : ""
                return (<tr key={index} className={discount}>
                    <td>{i == 'initial_products' ? '2022-03-06' : i}</td>
                    <td>{Math.round(prices[index] * 100) / 100}</td>
                    <td style={getColorValue(deviations[index])}>{deviations[index]}{deviations.length > 1 ? "%" : ""}</td>
                </tr>)
            })}
        </tbody>
    </BTable>);
}

export default Table;