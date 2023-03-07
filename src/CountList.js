import React from 'react';
import {Table} from 'react-bootstrap';
import { formatTime } from './static/helpers';

function CountList({count, company}) {

    const getVariance = (cash, containerId) => {
        let variance = cash - +company.containers[containerId].target;
        return (Math.round(variance * 100) / 100).toFixed(2);
    };

    return (
        <div>
            <h4>{company.containers[count[0].containerId].name}</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Count</th>
                        <th>Variance</th>
                        <th>Submitted By</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {count.map(c =>
                        <tr key={c.id}>
                            <td>{`$${c.cash}`}</td>
                            <td>
                                {`$${getVariance(c.cash, c.containerId)}`}
                            </td>
                            <td>{`${c.firstName} ${c.lastName}`}</td>
                            <td>{formatTime(c.time)}</td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
    );
};

export default CountList;