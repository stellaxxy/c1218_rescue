import React from 'react';
import exampleImage from "../../assets/images/cover1.jpg";

export default (props) => {
    console.log('caseitem props:', props);
    return(
        <div className='row'>
            <p></p>
            <img src={exampleImage}/>
        </div>
    );
}
//{`${location.street}, ${location.city}, ${location.zipcode}`}