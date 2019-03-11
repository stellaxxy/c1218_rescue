import React, { Component, Fragment } from 'react';
import { Field, change, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import DropZoneField from '../general/dropzone';

const imageIsRequired = value => (!value ? "Please upload a photo to continue" : undefined);

const UploadFormPage1 = props => {
  const { handleSubmit, imageFile, onDrop } = props;

  return (
    <form id="uploadform" onSubmit={handleSubmit}>
      <div className="prompt">
        <p>Let's start with a photo...</p>
      </div>

      <Field
        name="coverImg"
        component={DropZoneField}
        type="file"
        imagefile={imageFile}
        handleOnDrop={onDrop}
        validate={[imageIsRequired]}
        />

        
        <div className="btn-panel">
          <Link to="/" className="waves-effect waves-light btn">{'< Prev'}</Link>
          <button type="submit" form="uploadform" className="waves-effect waves-light btn">Next > </button>
        </div>
    </form>
  )
}

export default reduxForm({
  form: 'uploadform',
  initialValues: {caseDate: new Date().toLocaleDateString()},
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(UploadFormPage1)