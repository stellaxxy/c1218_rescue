import React, {Component} from 'react';
import {Link} from "react-router-dom";

class EmailConfirmation extends Component {
    render() {
        return (
            <div>
                <div className= "center"> Your Email has been sent</div>
                <div className="center">
                    <Link to="/" className="waves-effect waves-light btn orange text-white"
                          float="right">Go Back</Link>

                </div>
            </div>
        )
    }
}

export default EmailConfirmation;