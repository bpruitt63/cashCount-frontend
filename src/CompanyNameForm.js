import React from 'react';

function ComanyNameForm({handleSubmit, handleChange, data}) {    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text'
                        name='companyCode'
                        placeholder='Company Name'
                        value = {data.companyCode}
                        onChange={handleChange} />
                <button type='submit'>Submit</button>
            </form>
        </div>
        
    );
};

export default ComanyNameForm;