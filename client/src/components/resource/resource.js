import React from 'react';
import '../../assets/css/resource.scss';
import {Link} from 'react-router-dom';

export default () => {
    return(
        <div className="lostLandingContainer">
            <Link className="btn" to="/dogcare">Care For Dog</Link>
            <Link className="btn" to="/catcare">Care For Cat</Link>
            <Link className="btn" to="/searchvet">Vet</Link>
        </div>
    );
}