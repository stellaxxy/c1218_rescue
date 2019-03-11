import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from './general/modal/modal';
import axios from 'axios';
import {Fragment} from 'react';
import '../assets/css/mycase.scss';

class MyCase extends Component {
    state = {
        modal: true,
        data: null,
        error: false
    };

    closeModal = () =>{
        this.setState({
            modal: false
        })
    };

    handleSubmit = async formValues => {

        const result = await axios.get('/api/casedetails?caseKey=' + formValues.caseKey + '&email=' + formValues.email);

        if(result.data.success === true){
            this.setState({
                data: result.data.data
            })
        } else {
            this.setState({
                error: true
            });
        }
    };

    closeCase=async () =>{
        const {id} =this.state.data
        const response = await axios.post('/api/updatestatus',{id: id, status:'closed'});
    }




    render(){
        if(this.state.error === true){
            return (
                <Fragment>
                    <Modal onSubmit={this.handleSubmit} showModal={this.state.modal} closeModal={this.closeModal}/>
                    <div>No Matching Case</div>
                </Fragment>
            );
        }

        if(this.state.data === null){
            return (
                <Fragment>
                    <Modal onSubmit={this.handleSubmit} showModal={this.state.modal} closeModal={this.closeModal}/>
                </Fragment>

            );
        }

        return (
            <Fragment>

                <div className="myCaseContainer bottomContainer">
                    <h2 className="header">Please help me</h2>
                    <div className="w3-container w3-half">
                        <img src={this.state.data.coverImg}/>
                    </div>

                    <div className="w3-container w3-half">
                        <div className="orange text-white bold s12">City: {this.state.data.location.city}</div>
                        <div>Case id: {this.state.data.id}</div>
                        <div>Pet name:{this.state.data.animalDetail.name}</div>
                        <div>Pet type: {this.state.data.animalDetail.animalType}</div>
                        <div>Pet breed: {this.state.data.animalDetail.breed}</div>
                        <div>Pet color: {this.state.data.animalDetail.color}</div>
                        <div>Gender: {this.state.data.animalDetail.gender}</div>
                        <div>Animal size: {this.state.data.animalDetail.size}</div>
                        <div>Date lost: {this.state.data.date}</div>
                        <div>Pet description: {this.state.data.animalDetail.description} </div>
                        <div>Area last seen: {this.state.data.location.location}</div>
                        <div>Zip code: {this.state.data.location.zipcode}</div>
                    </div>

                    <div className="center">
                        {
                            this.state.data.status==='active' ?

                                (<Link to="/closecase" className="waves-effect waves-light btn orange text-white"
                                  onClick={this.closeCase}>CLOSE CASE</Link>)
                                :
                                 null
                        }
                    </div>
                </div>
                <Modal onSubmit={this.handleSubmit} showModal={this.state.modal} closeModal={this.closeModal}/>
            </Fragment>
        );
    }
}

export default MyCase;
