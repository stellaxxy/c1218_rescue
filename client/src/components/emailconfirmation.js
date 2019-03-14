import React, {Component} from 'react';
import {Link} from "react-router-dom";
import '../assets/css/emailconfirmation.scss';

class EmailConfirmation extends Component {
    render() {
        return (
            <div className="container">
                <div className= "mail-confirmation center"> Your Email has been sent</div>
                <div className="center">
                    <Link to="/" className="waves-effect waves-light btn orange text-white deep-orange accent-4"
                          float="right">Home</Link>

                </div>
            </div>
        )
    }
}

export default EmailConfirmation;