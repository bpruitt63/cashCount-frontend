import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHandleChange, useErrors, useToast } from './hooks';
import Errors from './Errors';
import Api from './Api';

function NewUserForm({company, addUser}) {

    const initialState = {id: '', firstName: '', lastName: '',
                        email: '', password: '', password2: ''};
    const [data, handleChange, setData] = useHandleChange(initialState);
    const initialSwitch = {admin: false, active: true, emailReceiver: false};
    const [switches, setSwitch] = useState(initialSwitch);
    const [errors, setErrors] = useState({});
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();
    const [message, toast] = useToast();

    const handleSwitch = (field) => {
        const updatedSwitches = {...switches, [field]: !switches[field]};
        if (updatedSwitches.companyAdmin) updatedSwitches.active = true;
        setSwitch(updatedSwitches);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiErrors({});
        if (!validate) return false;

        try {
            const newUser = compile();
            await Api.addUser(newUser, company.companyCode);
            addUser(newUser);
            setData(initialState);
            toast('User added');
        } catch (er) {
            getApiErrors(er);
            setData(initialState);
        };
    };

    const validate = () => {
        const err = {};
        if (switches.admin) {
            if (!data.email || !data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                err.email = "Must be valid email address";
            };
            if (!data.password || (data.password.length < 6 || data.password.length > 20)) {
                err.password = "Password must be between 6 and 20 characters";
            };
        };
        if (data.password !== data.password2) {
            err.password2 = 'Passwords must match';
        };
        if (!data.firstName || data.firstName.length > 30){
            err.firstName = "First name must be between 1 and 30 characters";
        };
        if (!data.lastName || data.lastName.length > 30){
            err.lastName = "Last name must be between 1 and 30 characters";
        };
        if (!data.id){
            err.id = "ID is required";
        };
        setErrors(err);
        if (Object.keys(err).length) return false;
        return true;
    };

    const compile = () => {
        const newUser = {...data};
        newUser.active = switches.admin ? true : switches.active;
        newUser.companyAdmin = switches.admin;
        newUser.emailReceiver = switches.emailReceiver;
        delete newUser.password2;
        if (!newUser.email) delete newUser.email;
        if (!newUser.password) delete newUser.password;
        return newUser;
    };

    return (
        <div>
            <Errors formErrors={errors}
                    apiErrors={apiErrors} />
            {message && <p className='toastMsg'>{message}</p>}
            <Form.Switch checked={switches.admin}
                        id='adminSwitch'
                        label={switches.admin ? 'Admin' : 'Basic User'}
                        onChange={() => handleSwitch('admin')} />
            <Form.Switch checked={switches.active}
                        id='activeSwitch'
                        disabled={switches.admin}
                        label={switches.active ? 'Active' : 'Inactive'}
                        onChange={() => handleSwitch('active')} />
            <Form onSubmit={handleSubmit}>
                <Form.Control type='text'
                            name='id'
                            id='id'
                            placeholder='User ID'
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
                    <Form.Control type='password'
                            name='password2'
                            id='password2'
                            placeholder='Retype Password'
                            value={data.password2}
                            onChange={handleChange} />
                    <Form.Switch checked={switches.emailReceiver}
                            id='emailReceiver'
                            label={switches.emailReceiver ? 'Receive variance emails' : "Don't receive variance emails"}
                            onChange={() => handleSwitch('emailReceiver')} />
                    </>}
                <Button type='submit'>Submit</Button>
            </Form>
        </div>
    );
};

export default NewUserForm;