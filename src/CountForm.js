import React, {useState} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { useHandleChange, useErrors, useToast } from './hooks';
import Errors from './Errors';
import Api from './Api';

function CountForm({company}) {

    const initialState = {'$100': 0, '$50': 0, '$20': 0, '$10': 0, '$5': 0, '$1': 0,
                        '$0.25': 0, '$0.10': 0, '$0.05': 0, '$0.01': 0};
    const [data, setData] = useState(initialState);
    const initialText = {notes: '', userId: ''};
    const [textData, handleTextChange, setTextData] = useHandleChange(initialText);
    const [total, setTotal] = useState(0.00);
    const initialContainer = Object.keys(company.containers).length === 1 ? Object.keys(company.containers)[0] : null;
    const [container, setContainer] = useState(initialContainer);
    const [errors, setErrors] = useState({});
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();
    const [message, toast] = useToast();

    const handleChange = (e) => {
        const {name, value} = e.target;
        const newData = {...data, [name]: value};
        setData(newData);
        let sum = 0.00;
        for (let key of Object.keys(newData)) {
            const factor = parseFloat(key.substring(1));
            sum += factor * newData[key];
        }
        setTotal(sum);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiErrors({});
        setErrors({});

        if (!container){
            setErrors({error: "Must select drawer/safe/etc"});
            return false;
        };
        if (!textData.userId){
            setErrors({error: "Must enter User ID"});
            return false;
        };
        if (!total) {
            setErrors({error: "Enter some money before saving"});
            return false;
        };
        const date = new Date();
        const time = date.toString();
        const timestamp = date.getTime();
        const count = {cash: total,
                        time,
                        timestamp,
                        note: textData.notes || null,
                        userId: textData.userId};
        try {
            await Api.postCount(count, container);
            setContainer(initialContainer);
            setData(initialState);
            setTextData(initialText);
            setTotal(0.00);
            toast('Count saved');
        } catch (err) {
            getApiErrors(err);
        };
    };

    return (
        
            <Form onSubmit={handleSubmit}>
                <Errors formErrors={errors}
                        apiErrors={apiErrors} />
                        {message && <p>{message}</p>}
                {Object.keys(company.containers).map(key =>
                    <Row key={`container${key}`}>
                        <Col md={{span: 3, offset: 5}}>
                            <Form.Check type='radio'
                                        id={`container${key}`}
                                        label={company.containers[key].name}
                                        checked={container===key}
                                        onChange={() => setContainer(key)} />
                        </Col>
                    </Row>)}
                {Object.keys(data).map(d => 
                    <Row key={d}>
                        <Col md={{span: 2, offset: 4}}>
                            <Form.Label>{d}</Form.Label>
                        </Col>
                        <Col md={2}>
                            <Form.Control type='number'
                                            name={d}
                                            min='0'
                                            max='1000'
                                            value={data[d]}
                                            onChange={handleChange} />
                        </Col>
                    </Row>)}
                <p>Total: ${total.toFixed(2)}</p>
                <Row>
                    <Col md={{span: 2, offset: 4}}>
                        <Form.Label>User ID</Form.Label>
                    </Col>
                    <Col md={2}>
                        <Form.Control type='text'
                                        name='userId'
                                        id='userId'
                                        placeholder='User ID'
                                        value={textData.userId}
                                        onChange={handleTextChange} />
                    </Col>
                </Row>
                <Row>
                    <Col md={{span: 4, offset: 4}}>
                        <Form.Label>Notes</Form.Label>
                        <Form.Control as='textarea' 
                                        rows={3}
                                        value={textData.notes}
                                        onChange={handleTextChange} />
                    </Col>
                </Row>
                <Button type='submit'>Save</Button>
            </Form>
        
    );
};

export default CountForm;