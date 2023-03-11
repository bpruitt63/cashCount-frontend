import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useToggle } from './hooks';
import LoginForm from './LoginForm';
import SuperAdmin from './SuperAdmin';
import Users from './Users';
import Containers from './Containers';

function Admin({user, handleLogin, company, handleCompany}) {

    const initialState = {users: false, containers: false, companies: false};
    const [toggle, isOpen] = useToggle(initialState);

    return (
        <div>
            <h4 className='formTitle'>Admin Tools</h4>
            {!user && 
                <LoginForm handleLogin={handleLogin}/>}
            {user && !user.superAdmin && !company &&
                <p>Please sign in company to proceed</p>}
            <ButtonGroup className='adminButtonGroup'>
                {user && company &&
                    <>
                        <Button variant={isOpen.users ? 'outline-secondary' : 'secondary'}
                                onClick={() => toggle('users')}>
                            Users
                        </Button>
                        <Button variant={isOpen.containers ? 'outline-secondary' : 'secondary'}
                                onClick={() => toggle('containers')}>
                            Containers
                        </Button>
                    </>}
                {user?.superAdmin &&
                    <>
                        <Button variant={isOpen.companies ? 'outline-secondary' : 'secondary'}
                                onClick={() => toggle('companies')}>
                            Add Company 
                        </Button>
                    </>}
            </ButtonGroup>
            {user && isOpen.users &&
                <Users company={company}/>}
            {user && isOpen.containers &&
                <Containers company={company}
                            handleCompany={handleCompany}/>}
            {isOpen.companies &&
                <SuperAdmin />}
        </div>
    );
};

export default Admin;