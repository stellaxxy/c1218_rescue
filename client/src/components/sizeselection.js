import React from 'react';
import smallDogImage from '../assets/images/image10.png';
import mediumDogImage from '../assets/images/image9.png';
import largeDogImage from '../assets/images/image8.jpg';
import '../assets/css/sizeselection.scss';
import {Link} from "react-router-dom";

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

            <Link className="btn" to="/typeselection">Go Back</Link>
            <Link className="btn" to="/caselist">Next</Link>
        </div>
    );
}