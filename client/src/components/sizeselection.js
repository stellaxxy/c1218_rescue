import React from 'react';
import smallDogImage from '../assets/images/image10.png';
import mediumDogImage from '../assets/images/image9.png';
import largeDogImage from '../assets/images/image8.jpg';
import '../assets/css/sizeselection.scss';
import NavButton from './general/navbutton';

export default () => {
    return (
        <div className="sizeSelectionContainer">
            <h1>Size of Your Lost Pet</h1>
            <div>
                <img src={smallDogImage}/>
                <button>Small</button>
            </div>
            <div>
                <img src={mediumDogImage}/>
                <button>Medium</button>
            </div>
            <div>
                <img src={largeDogImage}/>
                <button>Large</button>
            </div>

            <NavButton firstButton={{'Go Back': "/typeselection"}} secondButton={{'Next': "/caselist"}} className="btn"/>
        </div>
    );
}

