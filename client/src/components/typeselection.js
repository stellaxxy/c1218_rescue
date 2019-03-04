import React, {Component} from 'react';
import NavButton from "./general/navbutton";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setActiveAnimalType } from "../actions";

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
        const {animalType} = this.props;

        return (
            <div className="page-body">
                <main>
                    <div className="container">

                        <div className="type-selector">
                            <p>What kind of pet is it?</p>

                            <div className="images">
                                <input id="dog" type="radio" name="animalType" value="dog" onClick={()=>{this.props.setActiveAnimalType('dog')}}/>
                                <label className="typecard dog" htmlFor="dog"><span>DOG</span></label>  
                                <input id="cat" type="radio" name="animalType" value="cat" onClick={()=>{this.props.setActiveAnimalType('cat')}}/>
                                <label className="typecard cat" htmlFor="cat"><span>CAT</span></label>  
                                <input id="other" type="radio" name="animalType" value="other" onClick={()=>{this.props.setActiveAnimalType('other')}}/>
                                <label className="typecard other" htmlFor="other"><span>OTHER</span></label> 
                            </div>      
                        </div>


                    </div>
                </main>

                <footer className="page-footer">
                    <div className="btn-panel">
                        <Link to="/" className="btn">Prev</Link>
                        <Link to={"/sizeselection"}  className={"btn " + (animalType ? '' : 'disabled')}>Next</Link>
                    </div>                
                </footer>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        animalType: state.activeCase.animalType
    };
}

export default connect(mapStateToProps, { setActiveAnimalType })(TypeSelection);
