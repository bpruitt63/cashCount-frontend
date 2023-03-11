import React, {useState} from 'react';
import pencil_icon from './static/images/pencil_icon.png';
import { Table } from 'react-bootstrap';
import ContainerEditModal from './ContainerEditModal';

function ContainerList({containers, company, handleCompany}) {

    const [modal, setModal] = useState(null);

    const closeModal = () => setModal(null);

    if (!containers[0]) return <p>No Containers Found</p>;

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Target</th>
                        <th>Positive Threshold</th>
                        <th>Negative Threshold</th>
                        <th>Edit Container</th>
                    </tr>
                </thead>
                <tbody>
                    {containers.map(c => 
                        <tr key={c[0]}>
                            <td>{c[1].name}</td>
                            <td>{`$${c[1].target}`}</td>
                            <td>{`$${c[1].posThreshold}`}</td>
                            <td>{`$${c[1].negThreshold}`}</td>
                            <td>
                                <button className='iconButton'
                                        onClick={() => setModal(c[0])}>
                                    <img className='iconImg'
                                        src={pencil_icon}
                                        alt="Edit User" />
                                </button>
                            </td>
                        </tr>)}
                </tbody>
            </Table>
            {modal &&
                <ContainerEditModal containerId={modal}
                                    closeModal={closeModal}
                                    company={company}
                                    handleCompany={handleCompany} />}
        </>
    );
};

export default ContainerList;