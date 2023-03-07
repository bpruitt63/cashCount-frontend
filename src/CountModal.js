import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { formatTime } from './static/helpers';

function CountModal({count, getVariance, closeModal}) {

    return (
        <Modal show centered onHide={closeModal}>
            <Modal.Body>
                <p>Count: {count.cash}</p>
                <p>Variance: ${getVariance(count.cash, count.containerId)}</p>
                <p>Submitted By: {`${count.firstName} ${count.lastName}`}</p>
                <p>Time: {formatTime(count.time)}</p>
                <p>Notes: {count.note}</p>
            </Modal.Body>
            <Modal.Footer className='centered'>
                <Button onClick={closeModal}
                        variant='dark'>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CountModal;