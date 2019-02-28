import React from 'react';
import exampleImage from "../../assets/images/cover1.jpg";

export default (props) => {
    const { caseType, location } = props;
    let prefixForAddress = null;
    if(caseType === 'lost'){
        prefixForAddress = 'Last seen on';
    } else {
        prefixForAddress = 'Found on';
    }

    return(
        <div className='row'>
            <p>{`${prefixForAddress} ${location.street}, ${location.city} ${location.zipcode}`}</p>
            <img src={exampleImage}/>
        </div>
    );
}
