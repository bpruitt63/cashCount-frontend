import React, {useState} from 'react';
import { useHandleChange, useErrors } from './hooks';
import Errors from './Errors';
import CompanyNameForm from './CompanyNameForm';
import Admin from './Admin';
import Api from './Api';

function Home({user, company, handleLogin, handleCompany}) {

    const initialState = {containers: true, admin: false}
    const [isOpen, setIsOpen] = useState(initialState);
    const initialCompany = {companyCode: ''};
    const [companyData, handleCompanyChange, setCompanyData] = useHandleChange(initialCompany);
    const [errors, setErrors] = useState({});
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();

    const toggle = (field) => {
        setIsOpen({...isOpen, [field]: !isOpen[field]});
    };

    const submitCompany = async (e) => {
        e.preventDefault();
        setApiErrors({});
        setErrors({});

        if (!companyData.companyCode) {
            setErrors({error: "I'm quite sure your company has a name"});
            setCompanyData(initialCompany);
            return false;
        } else {
            try {
                const company = await Api.getCompany(companyData.companyCode);
                handleCompany(company);
            } catch (e) {
                getApiErrors(e);
                setCompanyData(initialCompany);
            };
        };
    };
    
    return (
        <div>
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