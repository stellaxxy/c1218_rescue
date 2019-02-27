import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import SideNav from './side_nav';

export default () => {
    return(
        <Fragment>
            <nav>
                <div className="nav-wrapper">
                    <Link className="brand-logo" to='/casemap'>PAWS</Link>
                    <Link to="#" className="sidenav-trigger" data-target="sidenav">
                        <i className="material-icons">menu</i>
                    </Link>
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <Link to="/caselist">FOUND</Link>
                        </li>
                        <li>
                            <Link to="/caselist">LOST</Link>
                        </li>
                        <li>
                            <Link to="/casemap">MAP</Link>
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
            <SideNav/>
        </Fragment>
    );
}
