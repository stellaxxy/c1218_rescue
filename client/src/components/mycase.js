import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from './general/modal/modal';
import axios from 'axios';
import {Fragment} from 'react';
import '../assets/css/mycase.scss';
import FlyerCode from './case-upload/flyer';

class MyCase extends Component {
    state = {
        modal: true,
        data: null,
        error: false
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
            })
            this.closeModal();
        } else {
            this.setState({
                error: true
            });
        }
    };

    closeCase = async () => {
        const {id} = this.state.data;
        const response = await axios.post('/api/updatestatus', {id: id, status: 'closed'});
    }


    render() {
        if (this.state.error === true) {
            return (
                <Fragment>
                    <Modal onSubmit={this.handleSubmit} showModal={this.state.modal} closeModal={this.closeModal}/>
                    <div>No Matching Case</div>
                </Fragment>
            );
        }

        if (this.state.data === null) {
            return (
                <Fragment>
                    <Modal onSubmit={this.handleSubmit} showModal={this.state.modal} closeModal={this.closeModal}/>

                </Fragment>

            );
        }

        return (

            <div className="myCaseContainer">

                <FlyerCode id={this.state.data.id}/>
                <div className="myCaseCloseBtnContainer">
                    {
                        this.state.data.status === 'active' ?

                            (<Link to="/closecase"
                                   className="waves-effect waves-light btn btn-action myCaseCloseBtn"
                                   onClick={this.closeCase}>CLOSE CASE</Link>)
                            :
                            null
                    }
                </div>
                <Modal onSubmit={this.handleSubmit} showModal={this.state.modal} closeModal={this.closeModal}/>
            </div>
        );
    }
}

export default MyCase;

/*
               <div className="container my-case">
                   <main>
                       <div className="leftMyCase">
                           <h4 className="header mycaseHeading">Please help me</h4>
                           <div className="w3-container w3-half">
                               <img className="responsive-img" src={this.state.data.coverImg}/>
                           </div>
                       </div>

                       <div className="rightMyCase">
                           <h4>Pet Detail</h4>
                           <table className="centered striped">
                               <thead>
                               <tr>
                                   <th>Case type: {this.state.data.caseType.toUpperCase()} </th>
                               </tr>
                               <tr>
                                   <th>City: {this.state.data.location.city} </th>
                               </tr>
                               <tr>
                                   <th>Area last seen: {this.state.data.location.location}</th>
                               </tr>
                               <tr>
                                   <th>Zip code: {this.state.data.location.zipcode}</th>
                               </tr>
                               <tr>
                                   <th>Animal size: {this.state.data.animalDetail.size}</th>
                               </tr>
                               <tr>
                                   <th>Date lost: {this.state.data.date}</th>
                               </tr>

                               <tr>
                                   <th>Pet description: {this.state.data.animalDetail.description}</th>
                               </tr>
                               </thead>

                           </table>
                       </div>
                   </main>

               </div>


               <footer className="page-footer">
                    <div className="btn-panel">

                    </div>
                </footer>
               */