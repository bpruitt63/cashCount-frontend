import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { useHandleChange, useErrors, useToast } from './hooks';
import Errors from './Errors';
import Api from './Api';

function ContainerForm({company}) {

    const initialState = {name: '', target: 0, posThreshold: 0, negThreshold: 0};
    const [data, handleChange, setData] = useHandleChange(initialState);
    const [errors, setErrors] = useState({});
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();
    const [message, toast] = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiErrors({});
        setErrors({});

        if (!data.name) {
            setErrors({error: 'Container needs a name'});
            return false;
        };
        try {
            const container = {name: data.name, target: +data.target,
                                posThreshold: +data.posThreshold, negThreshold: + data.negThreshold};
            await Api.addContainer(container, company.companyCode);
            setData(initialState);
            toast('Container added');
        } catch (er) {
            getApiErrors(er);
            setData(initialState);
        };
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Errors formErrors={errors}
                    apiErrors={apiErrors} />
            {message && <p className='toastMsg'>{message}</p>}
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
            <Button type='submit'>Submit</Button>
        </Form>
    );
};

export default ContainerForm;