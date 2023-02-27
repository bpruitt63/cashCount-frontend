import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { useHandleChange } from './hooks';

function CountForm() {

    const initialState = {'$100': 0, '$50': 0, '$20': 0, '$10': 0, '$5': 0, '$1': 0,
                        '$0.25': 0, '$0.10': 0, '$0.05': 0, '$0.01': 0};
    const [data, setData] = useState(initialState);
    const [notes, handleNoteChange] = useHandleChange({notes: ''});
    const [total, setTotal] = useState(0.00);

    const handleChange = (e) => {
        const {name, value} = e.target;
        const newData = {...data, [name]: value};
        setData(newData);
        let sum = 0.00;
        for (let key of Object.keys(newData)) {
            const factor = parseFloat(key.substring(1));
            sum += factor * newData[key];
        }
        setTotal(sum);
    };

    return (
        <Form>
            {Object.keys(data).map(d => 
                <div key={d}>
                    <Form.Label>{d}</Form.Label>
                    <Form.Control type='number'
                                    name={d}
                                    min='0'
                                    max='1000'
                                    value={data[d]}
                                    onChange={handleChange} />
                </div>)}
                <Form.Label>Notes</Form.Label>
                <Form.Control as='textarea' 
                                rows={3}
                                value={notes.notes}
                                onChange={handleNoteChange} />
            <Button type='submit'>Save</Button>
            <p>Total: ${total.toFixed(2)}</p>
        </Form>
    );
};

export default CountForm;