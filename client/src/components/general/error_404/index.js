import React from 'react';
import {Link} from 'react-router-dom';
import './error_404.scss';

export default props => {
    return (
        <div className="error404Div">
            <h3>404 Page Not Found</h3>
            <div className="error404Home">
                <Link className="waves-effect waves-light btn deep-orange" to="/">HOME</Link>
            </div>
        </div>
    );
}