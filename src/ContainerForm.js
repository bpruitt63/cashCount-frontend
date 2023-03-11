import React, {useState} from 'react';
import {Form, Button, Row, Col, InputGroup} from 'react-bootstrap';
import { useHandleChange, useErrors, useToast } from './hooks';
import Errors from './Errors';
import Api from './Api';

function ContainerForm({company, handleCompany}) {

    const initialState = {name: '', target: 0.00, posThreshold: 0.00, negThreshold: 0.00};
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
        if (data.name.length > 50) {
            setErrors({error: 'Container name cannot exceed 50 characters'});
            return false;
        };

        try {
            const container = {name: data.name, target: +data.target,
                                posThreshold: +data.posThreshold, negThreshold: + data.negThreshold};
            const result = await Api.addContainer(container, company.companyCode);
            const addedContainer = {name: result.name, 
                                    target: result.target,
                                    posThreshold: result.posThreshold,
                                    negThreshold: result.negThreshold};
            const updatedCompany = {...company,
                                        containers: {...company.containers,
                                        [result.id]: addedContainer}};
            handleCompany(updatedCompany);
            setData(initialState);
            toast('Container added');
        } catch (er) {
            getApiErrors(er);
            setData(initialState);
        };
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h5 className='formTitle'>New Container</h5>
            <Errors formErrors={errors}
                    apiErrors={apiErrors} />
            {message && <p className='toastMsg'>{message}</p>}
            <Row className='countFormRow'>
                <Col md={4} xl={{span: 2, offset: 1}}>
                    <Form.Label>Name</Form.Label>
                </Col>
                <Col md={8}>
                    <Form.Control type='text'
                                name='name'
                                id='name'
                                placeholder='Name'
                                value={data.name}
                                onChange={handleChange} />
                </Col>
            </Row>
            <Row className='countFormRow'>
                <Col md={4} xl={{span: 2, offset: 1}}>
                    <Form.Label>Target Amount</Form.Label>
                </Col>
                <Col md={8}>
                    <InputGroup>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control type='number'
                                        min='0'
                                        name='target'
                                        step='.01'
                                        id='target'
                                        value={data.target}
                                        onChange={handleChange} />
                    </InputGroup>
                </Col>
            </Row>
            <Row className='countFormRow'>
                <Col md={4} xl={{span: 2, offset: 1}}>
                    <Form.Label>Positive Threshold</Form.Label>
                </Col>
                <Col md={8}>
                    <InputGroup>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control type='number'
                                        min='0'
                                        name='posThreshold'
                                        step='.01'
                                        id='posThreshold'
                                        value={data.posThreshold}
                                        onChange={handleChange} />
                    </InputGroup>
                </Col>
            </Row>
            <Row className='countFormRow'>
                <Col md={4} xl={{span: 2, offset: 1}}>
                    <Form.Label>Negative Threshold</Form.Label>
                </Col>
                <Col md={8}>
                    <InputGroup>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control type='number'
                                        min='0'
                                        name='negThreshold'
                                        step='.01'
                                        id='negThreshold'
                                        value={data.negThreshold}
                                        onChange={handleChange} />
                    </InputGroup>
                </Col>
            </Row>
            <Button variant='info'
                    type='submit'
                    className='formSubmit'>
                Save Container
            </Button>
        </Form>
    );
};

export default ContainerForm;