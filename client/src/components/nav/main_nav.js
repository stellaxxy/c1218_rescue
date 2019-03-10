import './nav.scss';
import React, {Fragment, Component} from 'react';
import {Link} from 'react-router-dom';
import SideNav from './side_nav';
import {connect} from 'react-redux';
import {setActiveCaseType} from '../../actions';


class MainNav extends Component {

    render() {
        return (
            <Fragment>
                <div className="navbar-fixed navBar">
                    <nav>
                        <div className="nav-wrapper">
                            <Link className="brand-logo" to='/'>PAWS</Link>


                            <Link to="#" className="sidenav-trigger" data-target="sidenav">
                                <i className="material-icons">menu</i>
                            </Link>
                            <ul className="right hide-on-med-and-down">
                                <li>
                                    <Link to="/search?mode=list">SEARCH</Link>
                                </li>
                                <li>
                                    <Link to="/search?mode=map">MAP</Link>
                                </li>
                                <li>
                                    <Link to="/upload">UPLOAD CASE</Link>
                                </li>
                                <li>
                                    <Link to="/mycase">MY CASE</Link>
                                </li>
                                <li>
                                    <Link to="/resource">RESOURCE</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <SideNav/>
            </Fragment>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps, {setActiveCaseType})(MainNav);
