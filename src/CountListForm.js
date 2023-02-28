import React, {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
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
                [key]: false
            })));
    }, [company]);

    const handleCheck = (container) => {
        setContainers({...containers, [container]: !containers[container]});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setApiErrors({});

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
            for (let key of Object.keys(containers)) {
                if (containers[key]) {
                    const result = await Api.getCounts({startTime: from, endTime: to}, key);
                    setCounts(c => ({
                        ...c,
                        [key] : result
                    }));
                };
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
                <Form.Label>From</Form.Label>
                <Form.Control type='date'
                                name='fromDate'
                                value={data.fromDate}
                                onChange={handleChange} />
                <Form.Label>To</Form.Label>
                <Form.Control type='date'
                                name='toDate'
                                value={data.toDate}
                                onChange={handleChange} />
                {Object.keys(containers).map(c =>
                    <Form.Check key={`container${c}`}
                                type='checkbox'
                                id={`container${c}`}
                                label={company.containers[c].name}
                                checked={containers[c]}
                                onChange={() => handleCheck(c)} />)}
                <Button type='submit'>Get Counts</Button>
            </Form>
            {Object.keys(counts).map(key =>
                <CountList key={key}
                            count={counts[key]}
                            company={company} />)}
        </div>
    );
};

export default CountListForm;