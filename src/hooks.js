import {useState, useCallback} from 'react';

function useHandleChange(initialState={}) {
    const [data, setData] = useState(initialState);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setData(d => ({
            ...d,
            [name]: value
        }));
    };
    return [data, handleChange, setData];
};

function useErrors() {
    const [apiErrors, setApiErrors] = useState({});

    /** Sets state with object containing all errors returned from API calls */
    const getApiErrors = useCallback(e => {
        const errors = {...e};
        setApiErrors(errors);
    }, [setApiErrors]);
    return [apiErrors, getApiErrors, setApiErrors];
};

function useToast() {
    const [message, setMessage] = useState();

    function toast(msg, duration=2500) {
        setMessage(msg);
        setTimeout(() => {setMessage('')}, duration);
    };
    return [message, toast, setMessage];
};


export {useHandleChange, useErrors, useToast};