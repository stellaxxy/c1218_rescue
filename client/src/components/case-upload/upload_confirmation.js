import React from 'react';
import {Link} from 'react-router-dom';

export default props => {

    const {caseid, casekey} = props.match.params;

    if (Number(caseid)) {
        return (
            <div className="upload-confirmation">
                <div className="row">
                    <h5>Your case has been uploaded.</h5>
                    <h6>Case Key: {casekey}</h6>
                </div>

                <div className="row">
                    <Link to={"/flyer/"+caseid} className="waves-effect waves-light btn orange text-white">View Flyer</Link>
                </div>
                <div className="row">
                    <Link to={"/search"} className="waves-effect waves-light btn orange text-white">Lost/Found Pet List</Link>
                </div>

                <p>Best wishes from the PAWS team for a successful search.</p>
            </div>
        )
    }

    return (
        <div className="upload-confirmation">
            <h5>We're sorry.  An error has occurred.  Please try again later.</h5>
            <Link to="/" className="waves-effect waves-light btn orange text-white">Back</Link>
        </div>        
    )
}