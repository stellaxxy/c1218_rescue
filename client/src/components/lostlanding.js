import React from 'react';
import '../assets/css/lostlanding.scss';
import NavButton from './general/navbutton';
import {Link} from "react-router-dom";

export default () => {
    return(
        <div className="lostLandingContainer">
            <Link to="/typeselection" className="btn">Describe Your Pet</Link>
            <Link to="/caselist/lost" className="btn">See All List</Link>
        </div>
    );
}
//<NavButton firstButton={{'Describe Your Pet': "/typeselection"}} secondButton={{'See All List': "/caselist/lost"}} className="btn"/>