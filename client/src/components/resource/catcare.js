import React from 'react';
import NavButton from "../general/navbutton";

export default () => {
    return (
        <div>
            <h1>Cat Care</h1>
            <div>
                <p>Food cats can eat: meat, whole grains,  fish, veggies</p>
                <p>Food cats cannot eat: chocolate, alcohol,  grapes, onion, garlic</p>
                <p>Keep fresh water and food available at all time</p>
            </div>
            <NavButton firstButton={{'Vet': "/vetlist"}} className="btn"/>
        </div>
    );
}