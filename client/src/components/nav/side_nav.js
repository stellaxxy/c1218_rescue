import React, { Component } from 'react';
import {Link} from "react-router-dom";

class SideNav extends Component{
    componentDidMount(){
        M.Sidenav.init(this.sideNav);
    }

    render(){
        return(
            <ul ref={element => {this.sideNav = element}} className="sidenav" id="sidenav">
                <li>
                    <Link to="/caselist/found">FOUND</Link>
                </li>
                <li>
                    <Link to="/caselist/lost">LOST</Link>
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

export default SideNav;