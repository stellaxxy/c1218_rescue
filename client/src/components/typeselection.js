import React from 'react';
import { Link } from 'react-router-dom';
import dogImage from '../assets/images/image8.jpg';
import catImage from "../assets/images/image6.jpg";
import otherAnimalImage from "../assets/images/image7.png";
import '../assets/css/typeselection.scss';

export default () => {
    return (
        <div className="typeSelectionContainer">
            <h1>What Type of Pet?</h1>
            <div>
                <img src={dogImage}/>
                <button>Dog</button>
            </div>
            <div>
                <img src={catImage}/>
                <button>Cat</button>
            </div>
            <div>
                <img src={otherAnimalImage}/>
                <button>Others</button>
            </div>

            <Link className="btn" to="/lostlanding">Go Back</Link>
            <Link className="btn" to="/sizeselection">Next</Link>
        </div>
    );
}