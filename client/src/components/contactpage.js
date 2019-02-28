import React , {Component} from 'react';
import '../assets/css/casedetails.scss';
import axios from 'axios';
import '../assets/css/contactpage.scss'


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
                    Message
                    <textarea  className="text-area"  value = {this.state.value} onChange={this.handelChange}/>

                </label>
            </form>
                </div>
                <div className= "waves-button-input">
                <div className="center textEmail" >
                    <a className="waves-effect waves-light btn orange text-white">Text</a>
                    <a className="waves-effect waves-light btn orange text-white" float="right">Email</a>
                </div>
                <div className="center callBack" >
                    <a className="waves-effect waves-light btn orange text-white">Call</a>
                    <a className="waves-effect waves-light btn orange text-white" float="right">Back</a>
                </div>
                </div>
            </div>
        )
    }

}

export default Contact;