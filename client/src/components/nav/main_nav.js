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
                                    <Link className="sidenav-close" to="/search?mode=list"><i className="material-icons left">search</i>SEARCH</Link>
                                </li>
                                <li>
                                    <Link className="sidenav-close" to="/search?mode=map"><i className="material-icons left">map</i>MAP</Link>
                                </li>
                                <li>
                                    <Link className="sidenav-close" to="/upload"><i className="material-icons left">add</i>UPLOAD CASE</Link>
                                </li>
                                <li>
                                    <Link className="sidenav-close" to="/mycase"><i className="material-icons left">find_in_page</i>MY CASE</Link>
                                </li>
                                <li>
                                    <Link className="sidenav-close" to="/resource"><i className="material-icons left">info</i>RESOURCE</Link>
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
