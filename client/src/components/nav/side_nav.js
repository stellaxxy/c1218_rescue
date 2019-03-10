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
        );
    }
}

function mapStateToProps(){
    return {};
}

export default connect(mapStateToProps, {setActiveCaseType})(SideNav);