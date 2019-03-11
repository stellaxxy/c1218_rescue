import React from 'react';

export default (props) => {
    //console.log('vet item:', props);
    const { id, phone, image, location, name } = props;

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

    return (
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
                    <a href={"/vetoffice/"+id}>Details</a>
                </div>
            </div>
        </div>
    );
}

/*
<div className="card small horizontal">
            <div className="card-image">
                <img className="responsive" />
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
        */