import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import CountForm from './CountForm';
import CountList from './CountList';

function Main({company}) {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Button onClick={toggle}>
                {isOpen ? 'New Count' : 'Count List'}
            </Button>
            {!isOpen &&
                <CountForm company={company}/>}
            {isOpen &&
                <CountList company={company}/>}
        </div>
    );
};

export default Main;