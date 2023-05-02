import React, {useState} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { useHandleChange, useErrors, useToast } from './hooks';
import PasswordResetForm from './PasswordResetForm';
import Errors from './Errors';
import Api from './Api';

function LoginForm({handleLogin}) {

    const [forgotPassword, setForgotPassword] = useState(false);
    const initialState = {id: '', password: ''};
    const [data, handleChange, setData] = useHandleChange(initialState);
    const [errors, setErrors] = useState({});
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();
    const [message, toast] = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setApiErrors({});

        /** Validates login form and sets error if missing fields */
        if (!data.id || !data.password) {
            setErrors({error: "ID and Password are required"});
            setData(initialState);
            return false;
        } else {

            /** Checks for valid id/password combination.
             * Returns API token and puts into local storage.
             */
            try {
                const token = await Api.login(data);
                handleLogin(token);
            } catch (e) {
                getApiErrors(e);
                setData(initialState);
            };
        };
    };

    return (
        <div>
            <h5 className={forgotPassword ? 'rojo' : ''}>
                {forgotPassword ? 'Reset Password' : 'Login'}
            </h5>
            <Errors formErrors={errors}
                    apiErrors={apiErrors} />
            {message && <p className='toastMsg'>{message}</p>}
            {forgotPassword ?
                <PasswordResetForm setForgotPassword={setForgotPassword}
                                    toast={toast}/>
                :
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
                            <Form.Control type='password'
                                    name='password'
                                    placeholder='Password'
                                    value={data.password}
                                    onChange={handleChange}
                                    className='countFormRow' />
                        </Col>
                    </Row>
                    <Button variant='dark'
                            type='submit'
                            className='formSubmit'>
                        Login
                    </Button>
                </Form>}
            <button className='logoutButton'
                    onClick={() => setForgotPassword(!forgotPassword)}>
                {forgotPassword ? 'Return to login' : 'Forgot password?'}
            </button>
        </div>
    );
};

export default LoginForm;