import React from 'react';
import smallDogImage from '../assets/images/image10.png';
import mediumDogImage from '../assets/images/image9.png';
import largeDogImage from '../assets/images/image8.jpg';

export default () => {
    return (
        <div>
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
        </div>
    );
}