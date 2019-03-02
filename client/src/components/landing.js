import '../assets/css/landing.scss';
import React, { Component } from 'react';
import landingImage from '../assets/images/landing-page-pet.jpg';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { setActiveCaseType } from "../actions";

class Landing extends Component {

    render(){
        return(
            <div className="landing">
                <img className="responsive-img" src={landingImage} alt=""/>
                <p className="landing-title">Getting Pets Home</p>
                <p className="landing-text">Search for a lost pet or list one found.</p>
                <div className="btn-container">
                    <Link onClick={()=>{this.props.setActiveCaseType('lost')}} to="/lostlanding" className="waves-effect waves-light btn">Lost a Pet</Link>
                    <Link onClick={()=>{this.props.setActiveCaseType('found')}} to="/foundlanding" className="waves-effect waves-light btn">Found a Pet</Link>
                </div>
            </div>
        );    }

}

function mapStateToProps(state){
    return {};
}

export default connect(mapStateToProps, {setActiveCaseType})(Landing);