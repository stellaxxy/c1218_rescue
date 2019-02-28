import React from 'react';
import NavButton from "../general/navbutton";

export default () => {
    return (
        <div>
            <h1>Dog Care</h1>
            <div>
                <p>Food dogs can eat: rice/pasta, meat, carrots, cucumber, broccoli</p>
                <p>Food dogs cannot eat: chocolate, avocado,  grapes, onion, garlic</p>
                <p>Keep fresh water and food available at all time</p>
            </div>
            <NavButton firstButton={{'Vet': "/vetlist"}} className="btn"/>
        </div>
    );
}