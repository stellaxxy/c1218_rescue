import React from 'react';

// Based on: https://redux-form.com/8.2.0/examples/fieldlevelvalidation/

const InputField = ({
    input,
    label,
    type,
    placeholder,
    meta: { touched, error, warning }
}) => (
    <div>
        <label>{label}</label>
        <div>
        <input {...input} placeholder={placeholder} type={type} />
        {touched &&
            ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
        </div>
    </div>
);

export default InputField;