import React from 'react';

export default props => {
    //console.log('input props:', props);

    const { input, label, type } = props;

    return (
        <div className="input-field col s12">
            <input {...input} type={type} placeholder={label}/>
        </div>
    );
}