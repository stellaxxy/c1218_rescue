import React, {Component} from 'react';
import dogImage from '../assets/images/image9.png';
import catImage from "../assets/images/image13.png";
import otherAnimalImage from "../assets/images/image7.png";
import '../assets/css/typeselection.scss';
import NavButton from "./general/navbutton";
import { Link } from 'react-router-dom';

class TypeSelection extends Component {
    state = {
      selection: ''
    };

    saveSelection = () => {
        const selection= document.querySelector('input[name=typeselection]:checked').value;

        this.setState({
            selection
        });

    };

    render(){
        console.log('selection:', this.state.selection);
        return (

            <div className="typeSelectionContainer">
                <h1>What Type of Pet?</h1>
                <label>
                    <input type="radio" name="typeselection" value="dog"/>
                    <img src={dogImage}/>
                </label>
                <label>
                    <input type="radio" name="typeselection" value="cat"/>
                    <img src={catImage}/>
                </label>
                <label>
                    <input type="radio" name="typeselection" value="other"/>
                    <img src={otherAnimalImage}/>
                </label>

                <Link to="/lostlanding" className="btn">GO BACK</Link>
                <Link to="/sizeselection" onClick={this.saveSelection} className="btn">Next</Link>
            </div>
        );
    }
}
export default TypeSelection;
// <NavButton firstButton={{'Go Back': "/lostlanding"}} secondButton={{'Next': "/sizeselection"}} className="btn"/>
//
