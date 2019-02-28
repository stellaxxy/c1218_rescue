import React from 'react';
import '../assets/css/lostlanding.scss';
import NavButton from './general/navbutton';

export default () => {
    return(
        <div className="lostLandingContainer">
            <NavButton firstButton={{'Describe Your Pet': "/typeselection"}} secondButton={{'See All List': "/caselist"}}/>
        </div>
    );
}
