import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useToggle } from './hooks';
import ContainerForm from './ContainerForm';
import ContainerList from './ContainerList';

function Containers({company, handleCompany}) {

    const initialState = {containers: true, newContainer: false};
    const toggleState = {...initialState, containers: false};
    const [toggle, isOpen] = useToggle(initialState, toggleState);

    return (
        <div className='nestedTools'>
            <ButtonGroup className='nestedButtonGroup'>
                <Button variant={isOpen.containers ? 'outline-info' : 'info'}
                        onClick={() => toggle('containers')}>
                    Containers
                </Button>
                <Button variant={isOpen.newContainer ? 'outline-info' : 'info'}
                        onClick={() => toggle('newContainer')}>
                    New Container
                </Button>
            </ButtonGroup>
            {isOpen.containers &&
                <ContainerList containers={Object.entries(company.containers)}
                                company={company}
                                handleCompany={handleCompany} />}
            {isOpen.newContainer &&
                <ContainerForm company={company}
                                handleCompany={handleCompany} />}
        </div>
    );
};

export default Containers;