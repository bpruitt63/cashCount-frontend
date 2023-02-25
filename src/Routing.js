import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';

function Routing({user, company}) {

    return (
        <Routes>
            <Route path = '/' element={<Home user={user}
                                            company={company}/>} />
            <Route path='*' element={<Navigate to='/'/>} />
        </Routes>
    )
};

export default Routing;