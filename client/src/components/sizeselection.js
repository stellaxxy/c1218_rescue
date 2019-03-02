import React, { Component } from 'react';
import smallDogImage from '../assets/images/image10.png';
import mediumDogImage from '../assets/images/image9.png';
import largeDogImage from '../assets/images/image8.jpg';
import '../assets/css/sizeselection.scss';
import NavButton from './general/navbutton';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import { setActiveAnimalSize} from "../actions";

class AnimalSizeSelector extends Component{

    render(){
        const { animalSize, animalType, caseType } = this.props;

        console.log('sizeselection animalType:', animalType);
        console.log('sizeselection caseType:', caseType);

        return (
            <div className="sizeSelectionContainer">
                <h1>Size of Your Lost Pet</h1>
                <label onClick={()=>{this.props.setActiveAnimalSize('small')}}>
                    <input type="radio" name="sizeselection" value="small"/>
                    <img src={smallDogImage} className="small"/>
                </label>
                <label onClick={()=>{this.props.setActiveAnimalSize('medium')}}>
                    <input type="radio" name="sizeselection" value="medium"/>
                    <img src={mediumDogImage} className="medium"/>
                </label>
                <label onClick={()=>{this.props.setActiveAnimalSize('large')}}>
                    <input type="radio" name="sizeselection" value="large"/>
                    <img src={largeDogImage} className="large"/>
                </label>

                <Link to="/typeselection" className="btn">GO BACK</Link>
                <Link to="/caselist"  className="btn">Next</Link>

            </div>
        );
    }

}
//<NavButton firstButton={{'Go Back': "/typeselection"}} secondButton={{'Next': "/caselist"}} className="btn"/>
function mapStateToProps(state){
    return{
        animalSize: state.activeCase.animalSize,
        animalType: state.activeCase.animalType,
        caseType: state.activeCase.caseType
    };
}

export default connect(mapStateToProps, {setActiveAnimalSize})(AnimalSizeSelector);