import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import Errors from './Errors';
import { useErrors, useHandleChange, useToast } from './hooks';
import Api from './Api';

function ContainerEditModal({containerId, closeModal, company, handleCompany}) {

    const container = company.containers[containerId];
    const [data, handleChange] = useHandleChange({name: container.name,
                                                target: container.target,
                                                posThreshold: container.posThreshold,
                                                negThreshold: container.negThreshold});
    const [errors, setErrors] = useState({});
    const [disabledButtons, setDisabledButtons] = useState(false);
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();
    const [message, toast] = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setApiErrors({});

        if (!data.name) {
            setErrors({error: 'Container needs a name'});
            return false;
        };
        if (data.name.length > 50) {
            setErrors({error: 'Container name cannot exceed 50 characters'});
            return false;
        };

        try {
            const containerData = {name: data.name, target: +data.target,
                                posThreshold: +data.posThreshold, negThreshold: + data.negThreshold};
            const result = await Api.updateContainer(containerId, company.companyCode, containerData);
            const updatedContainer = {name: result.name, 
                                    target: result.target,
                                    posThreshold: result.posThreshold,
                                    negThreshold: result.negThreshold};
            const updatedCompany = {...company,
                                        containers: {...company.containers,
                                        [result.id]: updatedContainer}};
            handleCompany(updatedCompany);
            toast('Container updated', 1250);
            setTimeout(() => {
                closeModal();
            }, 1250);
        } catch (er) {
            getApiErrors(er);
        };
    };
    
    return (
        <Modal show centered backdrop='static'>
            <Modal.Body>
                <Errors formErrors={errors}
                        apiErrors={apiErrors} />
                {message && <p className='toastMsg'>{message}</p>}
                <Form>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text'
                                    name='name'
                                    id='name'
                                    placeholder='Name'
                                    value={data.name}
                                    onChange={handleChange} />
                    <Form.Label>Target Amount</Form.Label>
                    <Form.Control type='number'
                                    min='0'
                                    name='target'
                                    id='target'
                                    value={data.target}
                                    onChange={handleChange} />
                    <Form.Label>Positive Threshold</Form.Label>
                    <Form.Control type='number'
                                    min='0'
                                    name='posThreshold'
                                    id='posThreshold'
                                    value={data.posThreshold}
                                    onChange={handleChange} />
                    <Form.Label>Negative Threshold</Form.Label>
                    <Form.Control type='number'
                                    min='0'
                                    name='negThreshold'
                                    id='negThreshold'
                                    value={data.negThreshold}
                                    onChange={handleChange} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='dark'
                        onClick={closeModal}
                        disabled={disabledButtons}>
                    Cancel
                </Button>
                <Button variant='dark'
                        onClick={handleSubmit}
                        disabled={disabledButtons}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ContainerEditModal;