import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';


export default () => {

    return(

        <nav>
            <div className="nav-wrapper">
                <Link className="brand-logo" to='/map'>PAWS</Link>
                <ul className="right hide-on-med-and-down">
                    <li>
                        <Link to="/list">FOUND</Link>
                    </li>
                    <li>
                        <Link to="/list">LOST</Link>
                    </li>
                    <li>
                        <Link to="/map">MAP</Link>
                    </li>
                    <li>
                        <Link to="/upload">UPLOAD CASE</Link>
                    </li>
                    <li>
                        <Link to="/resource">RESOURCE</Link>
                    </li>
                </ul>
            </div>
        </nav>

    );
}
