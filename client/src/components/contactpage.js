import React , {Component} from 'react';
import '../assets/css/casedetails.scss';
import axios from 'axios';
import '../assets/css/contactpage.scss';
import {Link} from 'react-router-dom';



class Contact extends Component{
    constructor(props){
        super(props);
        this.state={
            value:''
        }

}

    handelSubmit(event){
        alert('Message sent:',this.state.value);
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
                    <textarea  className="text-area"  value = {this.state.value} onChange={this.handelChange}/>

                </label>
            </form>
                </div>
                <div className="center textEmail" >
                    <button className="waves-effect waves-light btn orange text-white text">Text</button>
                    <button className="waves-effect waves-light btn orange text-white" float="right">Email</button>
                </div>
                <div className="center callBack" >
                    <button className="waves-effect waves-light btn orange text-white call">Call</button>
                    <Link to ="/casedetails" className="waves-effect waves-light btn orange text-white">Back</Link>
                </div>
                </div>

        )
    }

}

export default Contact;