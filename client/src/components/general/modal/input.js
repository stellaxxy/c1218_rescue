import React from 'react';

export default ({ input, label, size = 's12', type  = 'text', meta: {error, touched}}) => {

    return (
        <div className="input-field col s12">
            <input {...input} type={type} placeholder={label}/>
            <p className= "red-text darken-2">{touched && error}</p>
        </div>
    );
}
