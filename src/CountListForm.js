import React, {useState, useEffect} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { useHandleChange, useErrors } from './hooks';
import { defaultDateFormat } from './static/helpers';
import Errors from './Errors';
import CountList from './CountList';
import Api from './Api';

function CountListForm({company}) {

    const initialState = {fromDate: defaultDateFormat(), 
                            toDate: defaultDateFormat()};
    const [data, handleChange, setData] = useHandleChange(initialState);
    const [containers, setContainers] = useState({});
    const [errors, setErrors] = useState({});
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();
    const [counts, setCounts] = useState({});

    useEffect(() => {
        Object.keys(company.containers).map(key =>
            setContainers(c => ({
                ...c,
                [key]: true
            })));
    }, [company]);

    const handleCheck = (container) => {
        setContainers({...containers, [container]: !containers[container]});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setApiErrors({});
        setCounts({});

        if (!Object.values(containers).includes(true)){
            setErrors({error: 'Must select at least one container'});
            return false;
        };
        if (!data.fromDate) {
            setErrors({error: 'From date is required'});
            return false;
        };
        if (!data.toDate) {
            setData({...data, fromDate: defaultDateFormat()});
        };
        const from = Date.parse(`${data.fromDate}T00:01:00.000-05:00`);
        const to = Date.parse(`${data.toDate}T23:59:59.000-05:00`);
        try {
            let noneFound = true;
            for (let key of Object.keys(containers)) {
                if (containers[key]) {
                    const result = await Api.getCounts({startTime: from, endTime: to}, key);
                    if (result[0]) {
                        noneFound = false;
                        setCounts(c => ({
                            ...c,
                            [key] : result
                        }));
                    };
                };
            };
            if (noneFound) {
                setErrors({error: 'No counts found'});
            };
        } catch (err) {
            getApiErrors(err);
        };
    };

    return (
        <div>
            <Errors formErrors={errors}
                    apiErrors={apiErrors} />
            <Form onSubmit={handleSubmit}>
                <Row className='countFormRow'>
                    <Col md={{span: 1, offset: 4}}>
                        <Form.Label>From</Form.Label>
                    </Col>
                    <Col md={3}>
                        <Form.Control type='date'
                                    name='fromDate'
                                    value={data.fromDate}
                                    onChange={handleChange} />
                    </Col>
                </Row>
                <Row className='countFormRow'>
                    <Col md={{span: 1, offset: 4}}>
                        <Form.Label>To</Form.Label>
                    </Col>
                    <Col md={3}>
                        <Form.Control type='date'
                                    name='toDate'
                                    value={data.toDate}
                                    onChange={handleChange} />
                    </Col>
                </Row>
                {Object.keys(containers).map(c =>
                    <Row key={`container${c}`}
                            className='countFormRow'>
                        <Col md={{span: 4, offset: 4}}>
                            <Form.Check type='checkbox'
                                    id={`container${c}`}
                                    label={company.containers[c].name}
                                    checked={containers[c]}
                                    onChange={() => handleCheck(c)} />
                        </Col>
                    </Row>)}
                <Button variant='dark'
                        className='getCountsButton'
                        type='submit'>
                    Get Counts
                </Button>
            </Form>
            {Object.keys(counts).map(key =>
                <CountList key={key}
                            count={counts[key]}
                            company={company} />)}
        </div>
    );
};

export default CountListForm;