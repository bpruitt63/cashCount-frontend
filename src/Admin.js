import React from 'react';

function Admin({user}) {

    return (
        <div>
            {!user && 
                <p>login</p>}
            {user &&
                <p>admin menu - users and containers</p>}
            {user.superAdmin &&
                <p>super admin link</p>}
        </div>
    );
};

export default Admin;