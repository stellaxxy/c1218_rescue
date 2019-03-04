import '../assets/css/landing.scss';
import React, { Component } from 'react';
import landingImage from '../assets/images/landing-page-pet.jpg';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { setActiveCaseType, setActiveAnimalSize, setActiveAnimalType } from "../actions";

class Landing extends Component {

    state = {
        modal: null
    }

    componentDidMount(){
        const modal = M.Modal.init(this.refs.modalBegin, {});
        this.setState({modal});
    } 

    handleButtonClick(selectedCaseType) {
        this.props.setActiveCaseType(selectedCaseType);
        this.props.setActiveAnimalSize(null);
        this.props.setActiveAnimalType(null);
        this.state.modal.open();
    }

    render(){
        const {activeCaseType} = this.props;

        return(
            <div className="landing">
                <img className="responsive-img" src={landingImage} alt=""/>
                <p className="landing-title">Getting Pets Home</p>
                <p className="landing-text">Search for a lost pet or list one found.</p>
                <div className="btn-container">
                    <button onClick={()=>{this.handleButtonClick('lost')}} className="waves-effect waves-light btn">Lost a Pet</button>
                    <button onClick={()=>{this.handleButtonClick('found')}} className="waves-effect waves-light btn">Found a Pet</button>
                </div>

                <div id="modalBegin" ref="modalBegin" className="modal">
                    <div className="modal-content">
                        <h5>Welcome</h5>
                        <p>How would you like to begin?</p>
                    </div>
                    <div className="modal-footer">
                        <Link to="/typeselection" className="waves-effect waves-light btn">Describe {activeCaseType === 'lost' ? 'Your':'The'} Pet</Link>
                        <Link to="/caselist" className="waves-effect waves-light btn">See List of All {activeCaseType === 'lost' ? 'found': 'lost'} Pets</Link>
                    </div>
                </div>
            </div>
        );    
    }
}

function mapStateToProps(state){
    return {
        activeCaseType: state.activeCase.caseType
    };
}

export default connect(mapStateToProps, 
    {setActiveCaseType, setActiveAnimalSize, setActiveAnimalType})(Landing);