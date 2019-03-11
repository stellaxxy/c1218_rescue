import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../assets/css/landing.scss';

class SelectCaseType extends Component {

    render(){
        return (
            <div className="landing bottomContainer">
                <div id="modalBegin" ref="modalBegin" className="modal z-depth-10 open">
                    <div className="modal-content">
                        <h4>Let's Begin</h4>
                        <p>Please tell us about your situation</p>
                    </div>
                    <div className="modal-footer">
                        <Link to="/upload?caseType=lost" className="waves-effect waves-light btn">I lost a pet</Link>
                        <Link to="/upload?caseType=found" className="waves-effect waves-light btn">I found a pet</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectCaseType;
