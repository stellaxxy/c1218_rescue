import './nav.scss';
import React, {Fragment, Component} from 'react';
import { Link } from 'react-router-dom';
import SideNav from './side_nav';
import { connect } from 'react-redux';
import { setActiveCaseType } from '../../actions';

class MainNav extends Component{
    render(){
        return(
            <Fragment>
                <nav>
                    <div className="nav-wrapper">
                        <Link className="brand-logo" to='/'>PAWS</Link>
                        <Link to="#" className="sidenav-trigger" data-target="sidenav">
                            <i className="material-icons">menu</i>
                        </Link>
                        <ul className="right hide-on-med-and-down">
                            <li>
                                <Link onClick={() => {this.props.setActiveCaseType('found')}} to="/caselist">FOUND</Link>
                            </li>
                            <li>
                                <Link onClick={() => {this.props.setActiveCaseType('lost')}} to="/caselist">LOST</Link>
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
}

function mapStateToProps(){
    return {};
}

export default connect(mapStateToProps, {setActiveCaseType})(MainNav);
