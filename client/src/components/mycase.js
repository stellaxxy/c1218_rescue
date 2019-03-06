import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from './general/modal/modal';
import axios from 'axios';
import {Fragment} from 'react';

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
        console.log('my case info:', formValues);

        const result = await axios.get('/api/casedetails?caseKey=' + formValues.caseKey + '&email=' + formValues.email);

        console.log(result);

        if(result.data.success === true){
            console.log('my case result data:', result.data.data);
            this.setState({
                data: result.data.data
            })
        } else {
            this.setState({
                error: true
            });
        }
    };

    render(){
        console.log('current state', this.state);

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
                    <div>Loading</div>
                </Fragment>

            );
        }
        
        return (
            <Fragment>
                <Modal onSubmit={this.handleSubmit} showModal={this.state.modal} closeModal={this.closeModal}/>
                <div className="myCaseContainer">
                    <h2 className="header ">Please help me</h2>
                    <div className="w3-container w3-half">
                        <img src={this.state.data.coverImg}/>
                    </div>

                    <div className="w3-container w3-half">
                        <div className="orange text-white bold s12">City
                            : {this.state.data.location.city}</div>
                        <div>Case id: {this.state.data.id}</div>
                        <div>PET NAME:{this.state.data.animalDetail.name}</div>
                        <div>PET TYPE : {this.state.data.animalDetail.animalType}</div>
                        <div>PET BREED : {this.state.data.animalDetail.breed}</div>
                        <div>PET COLOR: {this.state.data.animalDetail.color}</div>
                        <div>GENDER: {this.state.data.animalDetail.gender}</div>
                        <div>Animal Size: {this.state.data.animalDetail.size}</div>
                        <div>DATE LOST: {this.state.data.date}</div>
                        <div>PHONE: mobile</div>
                        <div>PET DESCRIPTION:{this.state.data.animalDetail.description} </div>
                        <div>AREA LAST SEEN : {this.state.data.location.location}</div>
                        <div>Zip Code:{this.state.data.location.zipcode}</div>
                    </div>

                    <div className="center">
                        <button className="btn">CLOSE CASE</button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MyCase;
