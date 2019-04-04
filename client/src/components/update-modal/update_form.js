import React, {Fragment} from 'react';
import { Field, reduxForm } from 'redux-form';
import './update_form.scss';
import UpdateForm from '../case-upload/upload_form';

let Update = (props) => {
    const { onSubmit, handleSubmit, onDrop, imageFile, isUpdate } = props;
   // console.log('props', props);
  return (
    <UpdateForm onSubmit={onSubmit} handleSubmit onDrop imageFile isUpdate/>
)
};

export default Update;