import React from 'react';

export default ({ input, label, size = 's12', type  = 'text', meta: {error, touched}}) => {
    //console.log('input props:', props);

    //const { input, label, type } = props;

    return (
        <div className="input-field col s10">
            <input {...input} type={type}/>
            <label>{label}</label>
            <p className= "red-text darken-2">{touched && error}</p>
        </div>
    );
}


/*   import React from 'react';

export default ({ input,label, size = 's12',type = 'text',meta: {error , touched} })=>{

    return (
        <div className={`input-field col ${size}`}>
        <input {...input} type={type} autoComplete= "off" />
        <label>{label}</label>
            <p className= "red-text darken-2">{touched && error}</p>
        </div>
    );
}*/