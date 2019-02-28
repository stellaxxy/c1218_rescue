import React from 'react';
import dogImage from '../assets/images/image8.jpg';
import catImage from "../assets/images/image6.jpg";
import otherAnimalImage from "../assets/images/image7.png";
import '../assets/css/typeselection.scss';
import NavButton from "./general/navbutton";

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

            <NavButton firstButton={{'Go Back': "/lostlanding"}} secondButton={{'Next': "/sizeselection"}} className="btn"/>
        </div>
    );
}
