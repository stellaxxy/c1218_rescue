import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    //console.log('vet item:', props);
    const { id, phone, image, location, name, queryString } = props;
    console.log('item query:', queryString);
    let address1 = '';
    let address2 = '';
    if(location.display_address[2]){
        address1 = location.display_address[0] + " " + location.display_address[1];
        address2 = location.display_address[2];
    } else {
        address1 = location.display_address[0];
        address2 = location.display_address[1];
    }
    //console.log('location:', location);
    //console.log(address1);
    //console.log(address2);
///vetoffice${queryString}&id=${id}
    return (
        <Link to={`/vetoffice${queryString}&id=${id}`}>
            <div className="card small horizontal">
                <div className="card-image">
                    <img className="responsive" src={image}/>
                </div>
                <div className="card-stacked">
                    <div className="card-content">
                        <div className="vetContent">
                            <p>{name}</p>
                            <p>Phone: {phone}</p>
                            <p>Address: {address1}</p>
                            <p>{address2}</p>
                        </div>
                    </div>
                    <div className="card-action">
                        <div>Details</div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
