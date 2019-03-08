import React from 'react';
import {Link} from 'react-router-dom';

export default props => {

    const {caseid, casekey} = props.match.params;

    if (caseid !== '0') {
        return (
            <div className="upload-confirmation">
                <h5>Your case has been uploaded.</h5>
                <h6>Case Key: {casekey}</h6>
                <Link to={"/casedetails/"+caseid} className="waves-effect waves-light btn orange text-white">View Case</Link>
                <p>Best wishes from the PAWS team for a successful search.</p>
            </div>
        )
    }

    return (
        <div className="upload-confirmation">
            <h5>We're sorry.  An error has occurred.  Please try again later.</h5>
            <Link to="/upload" className="waves-effect waves-light btn orange text-white">Back</Link>
        </div>        
    )
}