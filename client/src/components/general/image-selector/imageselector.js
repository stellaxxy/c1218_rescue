import React, { Fragment } from 'react';

const ImageSelector = ({ input, id, label }) => {
    return (
        <Fragment>
            <input {...input} id={id} type="radio" value={id}/>
            <label className={"typecard " + id} htmlFor={id}><span>{label}</span></label>
        </Fragment>
    )
}

export default ImageSelector;