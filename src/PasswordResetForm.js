import React, {useState} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { useHandleChange, useErrors } from './hooks';
import Errors from './Errors';
import Api from './Api';

function PasswordResetForm({setForgotPassword, toast}) {

    const initialState = {id: '', email: ''};
    const [data, handleChange, setData] = useHandleChange(initialState);
    const [errors, setErrors] = useState({});
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setApiErrors({});

        /** Validates form and sets error if missing or incorrect fields */
        const err = {};
        if (!data.id || !data.email) err.missing = "ID and email are required";
        if (!data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            err.email = "Must be valid email address";
        };
        setErrors(err);
        if (Object.keys(err).length) return false;
        try {
            const user = {email: data.email};
            await Api.resetPassword(data.id, user);
            setForgotPassword(false);
            toast('New password has been sent to your email', 5000);
        } catch (e) {
            getApiErrors(e);
            setData(initialState);
        };
    };

    return (
        <>
            <Errors formErrors={errors}
                    apiErrors={apiErrors} />
            <Form onSubmit={handleSubmit}>
                <Row className='countFormRow'>
                    <Col md={{span: 8, offset: 2}}>
                        <Form.Control type='text'
                                    name='id'
                                    placeholder='User Id'
                                    value={data.id}
                                    onChange={handleChange} />
                    </Col>
                </Row>
                <Row className='countFormRow'>
                    <Col md={{span: 8, offset: 2}}>
                        <Form.Control type='text'
                                    name='email'
                                    placeholder='Email'
                                    value={data.email}
                                    onChange={handleChange}
                                    className='countFormRow' />
                    </Col>
                </Row>
                <Button variant='danger'
                        type='submit'
                        className='formSubmit'>
                    Reset Password
                </Button>
            </Form>
        </>
    );
};

export default PasswordResetForm;