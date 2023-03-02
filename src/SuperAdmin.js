import React, {useState} from 'react';
import ComanyNameForm from './CompanyNameForm';
import { useHandleChange, useErrors, useToast } from './hooks';
import Errors from './Errors';
import Api from './Api';

function SuperAdmin() {

    const initialCompanyState = {companyCode: ''};
    const [companyData, handleCompanyChange, setCompanyData] = useHandleChange(initialCompanyState);
    const [errors, setErrors] = useState({});
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();
    const [message, toast] = useToast();
    const initialState = {newCompany: false};
    const [isOpen, setIsOpen] = useState(initialState);

    const toggle = (field) => {
        setIsOpen({...isOpen, [field]: !isOpen[field]});
    };

    const submitCompany = async (e) => {
        e.preventDefault();
        setApiErrors({});
        setErrors({});

        if (!companyData.companyCode.length) {
            setErrors({error: 'Company name cannot be blank'});
            return false;
        };
        try {
            await Api.addCompany(companyData);
            setCompanyData(initialCompanyState);
            toast('Company added');
        } catch (err) {
            getApiErrors(err);
        };
    };

    return (
        <div>
            <Errors formErrors={errors}
                    apiErrors={apiErrors} />
            {message && <p className='toastMsg'>{message}</p>}
            <button onClick={() => toggle('newCompany')}>
                {isOpen.newCompany ? 'Cancel add company' : 'Add company'}
            </button>
            {isOpen.newCompany &&
                <ComanyNameForm handleSubmit={submitCompany}
                                handleChange={handleCompanyChange}
                                data={companyData}/>}
            <p>possible future functions - delete things, create super admin, etc</p>
        </div>
    );
};

export default SuperAdmin;