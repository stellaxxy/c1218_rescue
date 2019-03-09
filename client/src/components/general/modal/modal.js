import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './modal.scss';
import { Field, reduxForm } from 'redux-form';
import Input from './input';

const Modal = (props) => {


    //console.log('modal props', props);
    const { handleSubmit, onSubmit, showModal, closeModal} = props;

    return (

        <form onSubmit={handleSubmit(onSubmit)} className={ showModal ? "modal open" : "modal" } >
            <div className="modal-content contentPadding">
                <h5 className="modalHeading">Please provide your email and unique key</h5>
                <div className="row modalRow">
                    <Field name="email" component={Input} label="Enter your email" type="email"/>
                </div>
                <div className="row modalRow">
                    <Field name="caseKey" component={Input} label="Enter your case key" type="text"/>
                </div>
            </div>
            <div className="modal-footer">
                <button onClick={closeModal} className="btn">Submit</button>
            </div>
        </form>

        );

};

export default reduxForm({
    form: 'my_case_user_info'
})(Modal);

