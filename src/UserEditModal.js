import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import Errors from './Errors';
import { useErrors, useHandleChange, useToast } from './hooks';
import Api from './Api';

function UserEditModal({user, closeModal, editUser}) {

    const [data, handleChange] = useHandleChange({firstName: user.firstName,
                                                            lastName: user.lastName,
                                                            email: user.email || '',
                                                            password: '',
                                                            password2: ''});
    const [switches, setSwitch] = useState({active: user.active,
                                            companyAdmin: user.adminCompanyCode ? true : false,
                                            emailReceiver: user.emailReceiver || false});
    const [errors, setErrors] = useState({});
    const [disabledButtons, setDisabledButtons] = useState(false);
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();
    const [message, toast] = useToast();


    const handleSwitch = (field) => {
        const updatedSwitches = {...switches, [field]: !switches[field]};
        if (updatedSwitches.companyAdmin) updatedSwitches.active = true;
        setSwitch(updatedSwitches);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setApiErrors({});

        if (!validate) return false;
        try {
            const userToUpdate = compile();
            setDisabledButtons(true);
            const updatedUser = await Api.updateUser(user.id, user.userCompanyCode, userToUpdate);
            editUser(updatedUser);
            toast('User updated', 1250);
            setTimeout(() => {
                closeModal();
            }, 1250);
        } catch (err) {
            getApiErrors(err);
        };
    };


    const validate = () => {
        const err = {};
        if (data.email && !data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            err.email = "Must be valid email address";
        };
        if (data.password && (data.password.length < 6 || data.password.length > 20)) {
            err.password = "Password must be between 6 and 20 characters";
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
        setErrors(err);
        if (Object.keys(err).length) return false;
        return true;
    };

    const compile = () => {
        const updatedUser = {...data};
        updatedUser.active = switches.companyAdmin ? true : switches.active;
        updatedUser.companyAdmin = switches.companyAdmin;
        updatedUser.emailReceiver = switches.emailReceiver;
        delete updatedUser.password2;
        if (!updatedUser.email) delete updatedUser.email;
        if (!updatedUser.password) delete updatedUser.password;
        return updatedUser;
    };
    
    return (
        <Modal show centered backdrop='static'>
            <Modal.Body>
                <Errors formErrors={errors}
                        apiErrors={apiErrors} />
                {message && <p className='toastMsg'>{message}</p>}
                <Form.Switch checked={switches.companyAdmin}
                            id='adminSwitch'
                            label={switches.companyAdmin ? 'Admin' : 'Basic User'}
                            onChange={() => handleSwitch('companyAdmin')} />
                <Form.Switch checked={switches.active}
                            id='activeSwitch'
                            disabled={switches.companyAdmin}
                            label={switches.active ? 'Active' : 'Inactive'}
                            onChange={() => handleSwitch('active')} />
                <Form onSubmit={handleSubmit}>
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
                    {switches.companyAdmin && 
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
                                placeholder='New Password'
                                value={data.password}
                                onChange={handleChange} />
                        <Form.Control type='password'
                                name='password2'
                                id='password2'
                                placeholder='Retype New Password'
                                value={data.password2}
                                onChange={handleChange} />
                        <Form.Switch checked={switches.emailReceiver}
                                id='emailReceiver'
                                label={switches.emailReceiver ? 'Receive variance emails' : "Don't receive variance emails"}
                                onChange={() => handleSwitch('emailReceiver')} />
                        </>}
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

export default UserEditModal;