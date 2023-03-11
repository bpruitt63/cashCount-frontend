import React, {useState} from 'react';
import pencil_icon from './static/images/pencil_icon.png';
import { Table } from 'react-bootstrap';
import UserEditModal from './UserEditModal';

function UserList({users, editUser}) {

    const [modal, setModal] = useState(null);

    const closeModal = () => setModal(null);

    if (!users[0]) return <p>No Users Found</p>;

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Edit User</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => 
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{`${u.firstName} ${u.lastName}`}</td>
                            <td>
                                <button className='iconButton'
                                        onClick={() => setModal(u)}>
                                    <img className='iconImg'
                                        src={pencil_icon}
                                        alt="Edit User" />
                                </button>
                            </td>
                        </tr>)}
                </tbody>
            </Table>
            {modal &&
                <UserEditModal user={modal}
                                closeModal={closeModal}
                                editUser={editUser} />}
        </>
    );
};

export default UserList;