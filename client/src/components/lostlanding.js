import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/lostlanding.scss';


export default () => {
    return(
        <div className="lostLandingContainer">
            <Link className="btn" to="/typeselection">Describe Your Pet</Link>
            <Link className="btn" to="/caselist">See All List</Link>
        </div>
    );
}
