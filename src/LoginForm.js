import React, {useState} from 'react';
import { useHandleChange, useErrors } from './hooks';
import Errors from './Errors';
import Api from './Api';

function LoginForm({handleLogin}) {

    const initialState = {id: '', password: ''};
    const [data, handleChange, setData] = useHandleChange(initialState);
    const [errors, setErrors] = useState({});
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setApiErrors({});

        /** Validates login form and sets error if missing fields */
        if (!data.id || !data.password) {
            setErrors({error: "ID and Password are required"})
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
            <Errors formErrors={errors}
                    apiErrors={apiErrors} />
            <form onSubmit={handleSubmit}>
                <input type='text'
                        name='id'
                        placeholder='User Id'
                        value={data.id}
                        onChange={handleChange} />
                <input type='password'
                        name='password'
                        placeholder='Password'
                        value={data.password}
                        onChange={handleChange} />
                <button type='submit'>Login</button>
            </form>
        </div>
    );
};

export default LoginForm;