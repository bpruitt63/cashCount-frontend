import React, {useState} from 'react';
import NewUserForm from './NewUserForm';

function Users({company}) {

    const initialState = {newUser: false}
    const [isOpen, setIsOpen] = useState(initialState);

    const toggle = (field) => {
        setIsOpen({...isOpen, [field]: !isOpen[field]});
    };

    return (
        <div>
            <button onClick={() => toggle('newUser')}>
                {isOpen.newUser ? 'Cancel Add User' : 'Add User'}
            </button>
            {isOpen.newUser &&
                <NewUserForm company={company}/>}
        </div>
    );
};

export default Users;