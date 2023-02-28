import React from 'react';
import {Table} from 'react-bootstrap';

function CountList({count, company}) {

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
                            <td>{c.cash}</td>
                            <td>
                                {+company.containers[c.containerId].target - +c.cash}
                            </td>
                            <td>{c.userId}</td>
                            <td>{c.time}</td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
    );
};

export default CountList;