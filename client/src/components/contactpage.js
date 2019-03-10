import React , {Component} from 'react';
import '../assets/css/casedetails.scss';
import axios from 'axios';
import '../assets/css/contactpage.scss';
import {Link} from 'react-router-dom';
import EmailConfirmation from "./emailconfirmation";



class Contact extends Component{
    constructor(props){
        super(props);
        this.state={
            value:''
        }

}

   async handelSubmit(event){
        console.log('this.props.params.caseid:',this.props.match.params)
       const {caseid} = this.props.match.params;
        await axios.post('/api/contactuser', {
            caseId : caseid,
            emailMessage: this.state.value
        })
    }


    handelChange(event){

        this.setState({value : event.target.value});

    }

    render(){
        return(
            <div className= "center form">
                <div>
            <form onSubmit={this.handelSubmit}>
                <label>
                    <textarea  className="text-area"  value = {this.state.value} onChange={this.handelChange.bind(this)}/>

                </label>
            </form>
                </div>
                <div className="center textEmail" >
                    <button className="waves-effect waves-light btn orange text-white" float="right" onClick={this.handelSubmit.bind(this)}>Email</button>
                    <Link to ="/casedetails" className="waves-effect waves-light btn orange text-white">Back</Link>
                </div>

                </div>

        )
    }

}

export default Contact;