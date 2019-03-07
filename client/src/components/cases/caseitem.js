import React from 'react';
import exampleImage from "../../assets/images/cover1.jpg";
import { Link } from 'react-router-dom';

export default (props) => {
    const { caseType, location, id, coverImg } = props;
    let prefixForAddress = null;
    if(caseType === 'lost'){
        prefixForAddress = 'Last seen';
    } else {
        prefixForAddress = 'Found';
    }

    return(

        <div className="card small horizontal">
        <div className="card-image">
            <img className="responsive" src={coverImg}/>
        </div>
        <div className="card-stacked">
            <div className="card-content">
                <p>{prefixForAddress} in {location.city}</p>
            </div>
            <div className="card-action">
                <a href={"/casedetails/"+id}>Details</a>
            </div>
        </div>
        </div>
    );
}
