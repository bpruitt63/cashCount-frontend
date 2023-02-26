import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHandleChange, useErrors } from './hooks';
import Errors from './Errors';
import Api from './Api';

function NewUserForm() {

    const initialState = {id: '', firstName: '', lastName: '',
                        email: '', password: ''};
    const [data, handleChange] = useHandleChange(initialState);
    const initialSwitch = {admin: false, active: true};
    const [switches, setSwitch] = useState(initialSwitch);
    const [errors, setErrors] = useState({});
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();

    const handleSwitch = (field) => {
        setSwitch({...switches, [field]: !switches[field]});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <Errors formErrors={errors}
                    apiErrors={apiErrors} />
            <Form.Switch checked={switches.admin}
                        id='adminSwitch'
                        label={switches.admin ? 'Admin' : 'Basic User'}
                        onChange={() => handleSwitch('admin')} />
            <Form.Switch checked={switches.active}
                        id='activeSwitch'
                        label={switches.active ? 'Active' : 'Inactive'}
                        onChange={() => handleSwitch('active')} />
            <Form onSubmit={handleSubmit}>
                <Form.Control type='text'
                            name='id'
                            id='id'
                            placeholder='User Id'
                            value={data.id}
                            onChange={handleChange} />
                <Form.Control type='text'
                            name='firstName'
                            id='firstName'
                            placeholder='First Name'
                            value={data.firstName}
                            onChange={handleChange} />
                <Form.Control type='text'
                            name='lastName'
                            id='lastName'
                            placeholder='Last Name'
                            value={data.lastName}
                            onChange={handleChange} />
                {switches.admin && 
                    <>
                    <Form.Control type='text'
                            name='email'
                            id='email'
                            placeholder='Email'
                            value={data.email}
                            onChange={handleChange} />
                    <Form.Control type='password'
                            name='password'
                            id='password'
                            placeholder='Password'
                            value={data.password}
                            onChange={handleChange} />
                    </>}
                <button type='submit'>Submit</button>
            </Form>
        </div>
    );
};

export default NewUserForm;