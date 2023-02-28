import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import CountForm from './CountForm';
import CountListForm from './CountListForm';

function Main({company}) {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Button className='topButton'
                    onClick={toggle}>
                {isOpen ? 'New Count' : 'Past Counts'}
            </Button>
            {!isOpen &&
                <CountForm company={company}/>}
            {isOpen &&
                <CountListForm company={company}/>}
        </div>
    );
};

export default Main;