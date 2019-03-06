import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from './general/modal/modal';
import axios from 'axios';

class MyCase extends Component {
    state = {
        modal: true
    };

    closeModal = () =>{
        this.setState({
            modal: false
        })
    };

    handleSubmit = async formValues => {
        console.log('my case info:', formValues);

        const result = await axios.get('/api/caselist?caseKey=' + formValues.caseKey + '&email=' + formValues.email);

        console.log(result);
    };

    render(){
        return (
            <Modal onSubmit={this.handleSubmit} showModal={this.state.modal} closeModal={this.closeModal}/>
        );
    }
}

export default MyCase;

