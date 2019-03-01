import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import hardCodedImg from '../../assets/images/image1.jpg';
import './upload.scss';

// TODO: Replace with minimal caseDetails component when ready
const hardCodedDetails = () => {
    return (
        <Fragment>
            <div className="card small horizontal">
                <div className="card-image">
                    <img src={hardCodedImg}/>
                </div>
                <div className="card-stacked">
                    <div className="card-content">
                        <p>LOST 01/15/2019.</p>
                        <p>Irvine, CA</p>
                    </div>
                    <div className="card-action">
                        <a href="#">Details</a>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

const UploadConfirmation = props => {
    return (
        <div className="container">
            <div className="row">
                <div className="col s12 m6 push-m3">
                    <div className="upload-confirmation">
                        <h5>Case ID (576639) created.</h5>
                        {hardCodedDetails()}
                        <Link to="/" className="waves-effect waves-light btn">Search for Matches</Link>
                    </div>            
                </div>
            </div>
        </div>
    );
}

export default UploadConfirmation;