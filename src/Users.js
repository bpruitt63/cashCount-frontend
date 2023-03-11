import React, {useState, useEffect} from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useToggle, useErrors } from './hooks';
import NewUserForm from './NewUserForm';
import UserList from './UserList';
import Errors from './Errors';
import Api from './Api';

function Users({company}) {

    const initialState = {activeUsers: true, inactiveUsers: false, newUser: false};
    const toggleState = {...initialState, activeUsers: false};
    const [toggle, isOpen] = useToggle(initialState, toggleState);
    const [apiErrors, getApiErrors] = useErrors({});
    const [activeUsers, setActiveUsers] = useState([]);
    const [inactiveUsers, setInactiveUsers] = useState([]);

    useEffect(() => {
        async function getUsers() {
            try {
                const users = await Api.getUsers(company.companyCode);
                const active = users.filter(user => user.active);
                const inactive = users.filter(user => !user.active);
                setActiveUsers(active);
                setInactiveUsers(inactive);
            } catch (err) {
                if (err[0] !== 'No users found') getApiErrors(err);
            };
        };
        getUsers();
    }, [company, getApiErrors]);


    const addUser = (newUser) => {
        if (newUser.active) {
            setActiveUsers([...activeUsers, newUser]);
        } else {
            setInactiveUsers([...inactiveUsers, newUser]);
        };
    };

    const editUser = (updatedUser) => {
        const activeIndex = activeUsers.findIndex(u => u.id === updatedUser.id);
        const inactiveIndex = inactiveUsers.findIndex(u => u.id === updatedUser.id);
        const updatedActive = [...activeUsers];
        const updatedInactive = [...inactiveUsers];
        if (updatedUser.active) {
            if (activeIndex === -1) {
                updatedActive.push(updatedUser);
                updatedInactive.splice(inactiveIndex, 1);
            } else {
                updatedActive[activeIndex] = updatedUser;
            };
        } else {
            if (inactiveIndex === -1) {
                updatedInactive.push(updatedUser);
                updatedActive.splice(activeIndex, 1);
            } else {
                updatedInactive[inactiveIndex] = updatedUser;
            };
        };
        setActiveUsers(updatedActive);
        setInactiveUsers(updatedInactive);
    };


    return (
        <div className='nestedTools'>
            <ButtonGroup className='nestedButtonGroup'>
                <Button variant={isOpen.activeUsers ? 'outline-info' : 'info'}
                        onClick={() => toggle('activeUsers')}>
                    Active
                </Button>
                <Button variant={isOpen.inactiveUsers ? 'outline-info' : 'info'}
                        onClick={() => toggle('inactiveUsers')}>
                    Inactive
                </Button>
                <Button variant={isOpen.newUser ? 'outline-info' : 'info'}
                        onClick={() => toggle('newUser')}>
                    New User
                </Button>
            </ButtonGroup>
            <Errors apiErrors={apiErrors} />
            {isOpen.activeUsers &&
                <>
                    <h5>Active Users</h5>
                    <UserList users={activeUsers}
                                editUser={editUser} />
                </>}
            {isOpen.inactiveUsers &&
                <>
                    <h5>Inactive Users</h5>
                    <UserList users={inactiveUsers}
                                editUser={editUser} />
                </>}
            {isOpen.newUser &&
                <NewUserForm company={company}
                            addUser={addUser}/>}
        </div>
    );
};

export default Users;