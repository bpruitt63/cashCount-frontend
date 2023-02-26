import React from 'react';
import LoginForm from './LoginForm';
import SuperAdmin from './SuperAdmin';
import NewUserForm from './NewUserForm';

function Admin({user, handleLogin}) {

    return (
        <div>
            {!user && 
                <LoginForm handleLogin={handleLogin}/>}
            {user &&
                <NewUserForm/>}
            {user && user.superAdmin &&
                <SuperAdmin />}
        </div>
    );
};

export default Admin;