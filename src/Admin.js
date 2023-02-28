import React, {useState} from 'react';
import LoginForm from './LoginForm';
import SuperAdmin from './SuperAdmin';
import Users from './Users';
import ContainerForm from './ContainerForm';

function Admin({user, handleLogin, company}) {

    const initialState = {users: false, containers: false}
    const [isOpen, setIsOpen] = useState(initialState);

    const toggle = (field) => {
        setIsOpen({...isOpen, [field]: !isOpen[field]});
    };

    return (
        <div>
            {!user && 
                <LoginForm handleLogin={handleLogin}/>}
            {user &&
                <button onClick={() => toggle('users')}>
                    {isOpen.users ? 'Close User Menu' : 'Users'}    
                </button>}
            {user && isOpen.users &&
                <Users company={company}/>}
            {user &&
                <button onClick={() => toggle('containers')}>
                    {isOpen.containers ? 'Close Container Menu' : 'Containers'}    
                </button>}
            {user && isOpen.containers &&
                <ContainerForm company={company}/>}
            {user && user.superAdmin &&
                <SuperAdmin />}
        </div>
    );
};

export default Admin;