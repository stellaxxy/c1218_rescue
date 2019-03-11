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

    closeCase=async () =>{
        console.log('this.state.data:', this.state.data)
        const {id} =this.state.data
        console.log(this.state.data)
        const response = await axios.post('/api/updatestatus',{id: id, status:'closed'});
        console.log('response',response);


    }




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
                    <h2 className="header">Please help me</h2>
                    <div className="w3-container w3-half">
                        <img src={this.state.data.coverImg}/>
                    </div>

                    <table className="centered striped">
                        <thead>
                        <tr>
                            <th>City:{this.state.data.location.city} </th>
                        </tr>
                        <tr>
                            <th>Case id: {this.state.data.id}</th>
                        </tr>
                        <tr>
                            <th>Pet name: {this.state.data.animalDetail.name}</th>
                        </tr>
                        <tr>
                            <th>Pet name: {this.state.data.animalDetail.name}</th>
                        </tr>
                        <tr>
                            <th>Pet breed: {this.state.data.animalDetail.breed}</th>
                        </tr>
                        <tr>
                            <th>Pet color: {this.state.data.animalDetail.color}</th>
                        </tr>
                        <tr>
                            <th>Gender: {this.state.data.animalDetail.gender}</th>
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
                        <tr>
                            <th>Area last seen: {this.state.data.location.location}</th>
                        </tr>
                        <tr>
                            <th>Zip code: {this.state.data.location.zipcode}</th>
                        </tr>
                        </thead>

                    </table>

                    <footer className="page-footer center">
                        {
                            this.state.data.status==='active' ?

                                (<Link to="/closecase" className="waves-effect waves-light btn btn-action deep-orange accent-4"
                                  onClick={this.closeCase}>CLOSE CASE</Link>)
                                :
                                 null
                        }
                    </footer>
                </div>
            </Fragment>
        );
    }
}

export default MyCase;
