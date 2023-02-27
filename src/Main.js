import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import CountForm from './CountForm';
import CountList from './CountList';

function Main() {

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
                <CountForm />}
            {isOpen &&
                <CountList />}
        </div>
    );
};

export default Main;