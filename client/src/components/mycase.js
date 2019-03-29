import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from './general/modal/modal';
import axios from 'axios';
import {Fragment} from 'react';
import '../assets/css/mycase.scss';
import FlyerCode from './case-upload/flyer';
import UpdateForm from './update-modal/update_form';

class MyCase extends Component {
    state = {
        modal: true,
        data: null,
        error: false,
        update: false
    };

    closeModal = () => {
        this.setState({
            modal: false
        })
    };

    handleSubmit = async formValues => {

        const result = await axios.get('/api/casedetails?caseKey=' + formValues.caseKey + '&email=' + formValues.email);

        if (result.data.success === true) {
            this.setState({
                data: result.data.data
            });
            this.closeModal();
        } else {
            this.setState({
                error: true
            });
        }
    };

    handleUpdateBtn = () => {
        this.setState({
            update: true
        });
    };

    handleUpdate = async (formValues) => {
        event.preventDefault();
        console.log('DATA:', {id: this.state.data.id, ...formValues});
        const updateResult = await axios.post('/api/updatecase', {id: this.state.data.id, ...formValues});
        this.setState({
            update: false
        })
    };

    closeCase = async () => {
        const {id} = this.state.data;
        const response = await axios.post('/api/updatestatus', {id: id, status: 'closed'});
    };


    render() {
        if (this.state.error === true) {
            return (
                <Fragment>
                    <Modal onSubmit={this.handleSubmit} showModal={this.state.modal} heading="Please provide your email and unique key" info={[]}/>
                    <div>No Matching Case</div>
                </Fragment>
            );
        }

        if (this.state.data === null) {
            return (
                <Fragment>
                    <Modal onSubmit={this.handleSubmit} showModal={this.state.modal} heading="Please provide your email and unique key"/>
                </Fragment>

            );
        }

        return (

            <div className="myCaseContainer">
                {
                    this.state.update ?
                        (<UpdateForm showUpdate={this.state.update} onSubmit={this.handleUpdate}/>)
                        :
                        (<Fragment>
                            <FlyerCode id={this.state.data.id}/>
                            <div className="myCaseCloseBtnContainer">
                                {
                                    this.state.data.status === 'active' ?

                                        (<Fragment>
                                            <Link to="/closecase" className="waves-effect waves-light btn btn-action myCaseCloseBtn" onClick={this.closeCase}>CLOSE CASE</Link>
                                            <button className="waves-effect waves-light btn btn-action myCaseCloseBtn"  onClick={this.handleUpdateBtn}>UPDATE CASE</button>
                                        </Fragment>)
                                        :
                                        null
                                }
                            </div>

                            <Modal onSubmit={this.handleSubmit} showModal={this.state.modal} heading="Please provide your email and unique key"/>
                        </Fragment>)
                }


            </div>
        );
    }
}

export default MyCase;
