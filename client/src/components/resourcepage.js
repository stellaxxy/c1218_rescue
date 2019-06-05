import React from 'react';
import '../assets/css/resource.scss';
import NavButton from './general/navbutton';

export default () => {
    return(
        <div className="lostLandingContainer">
            <NavButton firstButton={{'Care For Dog': "/dogcare"}} secondButton={{'Care For Cat': "/catcare"}} thirdButton={{'Vet': "/searchvet"}} className="btn"/>
        </div>
    );
}