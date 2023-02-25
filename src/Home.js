import React from 'react';

function Home({user, company}) {
    
    return (
        <div>
            <p>welcome home fucko</p>
            {!company &&
                <p>company name form</p>}
            {company &&
                <p>company functions - count or count list</p>}
            <p>admin link</p>
        </div>
    );
};

export default Home;