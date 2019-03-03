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
        );
    }
}

function mapStateToProps(){
    return {};
}

export default connect(mapStateToProps, {setActiveCaseType})(SideNav);