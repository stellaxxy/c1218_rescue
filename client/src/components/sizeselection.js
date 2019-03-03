import React, { Component, Fragment } from 'react';
import NavButton from './general/navbutton';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import { setActiveAnimalSize} from "../actions";

class AnimalSizeSelector extends Component{

    render(){
        const { animalSize, animalType, caseType } = this.props;
        return (
            <div className="page-body">
                <main>
                    <div className="container">

                        <div className="type-selector">
                            <p>How big is the pet?</p>

                            <div className="images">
                                <input id="small" type="radio" name="animalSize" value="small" onClick={()=>{this.props.setActiveAnimalSize('small')}}/>
                                <label className="typecard small" htmlFor="small"><span>SMALL</span></label>  
                                <input id="medium" type="radio" name="animalSize" value="medium" onClick={()=>{this.props.setActiveAnimalSize('medium')}}/>
                                <label className="typecard medium" htmlFor="medium"><span>MEDIUM</span></label>  
                                <input id="large" type="radio" name="animalSize" value="large" onClick={()=>{this.props.setActiveAnimalSize('large')}}/>
                                <label className="typecard large" htmlFor="large"><span>LARGE</span></label> 
                            </div>      
                        </div>


                    </div>
                </main>

                <footer className="page-footer">
                    <div className="btn-panel">
                        <Link to="/typeselection" className="btn">Prev</Link>
                        <Link to={"/caselist"} className={"btn " + (animalSize ? '' : 'disabled')}>Next</Link>
                    </div>                
                </footer>
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