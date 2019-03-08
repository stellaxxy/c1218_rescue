import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import { setActiveCaseType } from '../../actions';

class SideNav extends Component{
    componentDidMount(){
        M.Sidenav.init(this.sideNav);
    }

    render(){
        return(
            <ul ref={element => {this.sideNav = element}} className="sidenav" id="sidenav">
                <li>
                    <Link className="sidenav-close" to="/search">SEARCH</Link>
                </li>
                <li>
                    <Link className="sidenav-close" to="/casemap">MAP</Link>
                </li>
                <li>
                    <Link className="sidenav-close" to="/upload">UPLOAD CASE</Link>
                </li>
                <li>
                    <Link className="sidenav-close" to="/mycase">MY CASE</Link>
                </li>
                <li>
                    <Link className="sidenav-close" to="/resource">RESOURCE</Link>
                </li>
            </ul>
        );
    }
}

function mapStateToProps(){
    return {};
}

export default connect(mapStateToProps, {setActiveCaseType})(SideNav);