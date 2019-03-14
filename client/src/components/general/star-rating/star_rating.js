import React from 'react';
import './star_rating.scss';

export default props => {
    console.log(props);
    const wholeStar = parseInt(props.rating);
    const partialStar = props.rating - wholeStar;
    console.log(wholeStar, partialStar);
    const stars = [];
    for(let starIndex = 0; starIndex < wholeStar; starIndex++){
        stars.push(
            <div key={starIndex} className="starContainer">
                <i className="material-icons">star</i>
            </div>
        );
    }
    if(partialStar > 0){
        stars.push(
            <div key={wholeStar} className="starContainer">
                <i className="material-icons">star_half</i>
            </div>
        )
    }
    return(
       <div>{stars}</div>
    );

}