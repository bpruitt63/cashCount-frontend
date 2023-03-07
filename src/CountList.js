import React, {useState} from 'react';
import {Table} from 'react-bootstrap';
import note from './static/images/note.png';
import { formatTime } from './static/helpers';
import CountModal from './CountModal';

function CountList({count, company}) {

    const [modal, setModal] = useState(null);

    const closeModal = () => setModal(null);

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
                        <th>Notes</th>
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
                            <td>
                                {c.note ? 
                                    <button className='iconButton'
                                            onClick={() => setModal(c)}>
                                        <img className='iconImg'
                                            src={note}
                                            alt="Note" />
                                    </button> 
                                        : ''}
                            </td>
                        </tr>)}
                </tbody>
            </Table>
            {modal &&
                <CountModal count={modal}
                            getVariance={getVariance}
                            closeModal={closeModal} />}
        </div>
    );
};

export default CountList;