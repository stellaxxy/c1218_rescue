import React from 'react';

export default (props) => {
    //console.log('vet item:', props);
    const { phone, image, location, name } = props;

    let address = location.address1;

    if(location.address2){
        address += `, ${location.address2}`;
        if(location.address3){
            address += ` ${location.address3}, `;
        }
    }

    address += `${location.city} `;
    console.log(address);

    return (
        <div className="card small horizontal">
            <div className="card-image">
                <img className="responsive" src={image}/>
            </div>
            <div className="card-stacked">
                <div className="card-content">
                    <p>{name}</p>
                    <p>Phone: {phone}</p>
                    <p>Address: {}</p>
                </div>
                <div className="card-action">
                    <a href={"/casedetails/"}>Details</a>
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