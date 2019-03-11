import React from 'react';

export default props => {

    const { input, label, type } = props;

    return (
        <div className="input-field col s10">
            <input {...input} type={type}/>
            <label>{label}</label>
        </div>
    );
}