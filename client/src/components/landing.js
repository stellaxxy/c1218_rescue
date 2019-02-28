import '../assets/css/landing.scss';
import React from 'react';
import landingImage from '../assets/images/landing-page-pet.jpg';
import {Link} from 'react-router-dom';

export default () => {
    return(
        <div className="landing">
            <img className="responsive-img" src={landingImage} alt=""/>
            <p className="landing-title">Getting Pets Home</p>
            <p className="landing-text">Search for a lost pet or list one found.</p>
            <div className="btn-container">
                <Link to="/lostlanding" className="waves-effect waves-light btn btn-large">Lost a Pet</Link>
                <Link to="/foundlanding" className="waves-effect waves-light btn btn-large">Found a Pet</Link>
            </div>
        </div>
    );
}