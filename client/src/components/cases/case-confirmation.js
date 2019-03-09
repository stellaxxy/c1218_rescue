import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class CloseCase extends Component {

    render() {

        return (
            <div className="close-case center">
                <h5>Your case is closed.</h5>
                <p>Thanks for using PAWS.</p>
            </div>
        )
    }
}

export default CloseCase