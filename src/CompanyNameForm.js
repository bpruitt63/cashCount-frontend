import React from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';

function ComanyNameForm({handleSubmit, handleChange, data}) {    

    return (
        <Row>
            <Col md={{span: 8, offset: 2}}>
                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Form.Control type='text'
                                name='companyCode'
                                placeholder='Company Name'
                                value = {data.companyCode}
                                onChange={handleChange} />
                        <Button variant='dark'
                                type='submit'>
                            Submit
                        </Button>
                    </InputGroup>
                </Form>
            </Col>
        </Row>
        
    );
};

export default ComanyNameForm;