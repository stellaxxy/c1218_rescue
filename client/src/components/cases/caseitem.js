import React from 'react';
import exampleImage from "../../assets/images/cover1.jpg";
import { Link } from 'react-router-dom';

export default (props) => {
    const { caseType, location, id, coverImg } = props;
    let prefixForAddress = null;
    if(caseType === 'lost'){
        prefixForAddress = 'Last seen on';
    } else {
        prefixForAddress = 'Found on';
    }

    return(
        <Link to={"/casedetails/"+id}>
            <div className='row caseItem'>
                <div className="addressContainer">
                    <p>{`${prefixForAddress} ${location.location}, ${location.city} ${location.zipcode}`}</p>
                </div>

                <img src={coverImg}/>
            </div>
        </Link>

    );
}
