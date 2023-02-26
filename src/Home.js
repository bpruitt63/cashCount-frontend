import React, {useState} from 'react';
import { useHandleChange, useErrors } from './hooks';
import Errors from './Errors';
import CompanyNameForm from './CompanyNameForm';
import Admin from './Admin';

function Home({user, company, handleLogin}) {

    const initialState = {containers: true, admin: false}
    const [isOpen, setIsOpen] = useState(initialState);
    const [companyData, handleCompanyChange] = useHandleChange({companyCode: ''});
    const [errors, setErrors] = useState({});
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();

    const toggle = (field) => {
        setIsOpen({...isOpen, [field]: !isOpen[field]});
    };

    const submitCompany = async (e) => {
        e.preventDefault();
    };
    
    return (
        <div>
            <p>welcome home fucko</p>
            <Errors formErrors={errors}
                    apiErrors={apiErrors} />
            {!company &&
                <CompanyNameForm handleChange={handleCompanyChange}
                                handleSubmit={submitCompany}
                                data={companyData}/>}
            {company &&
                <p>company functions - count or count list</p>}
            <button onClick={() => toggle('admin')}>
                {isOpen.admin ? 'Close Admin Tools' : 'Admin'}
            </button>
            {isOpen.admin && <Admin user={user}
                                    handleLogin={handleLogin}/>}
        </div>
    );
};

export default Home;