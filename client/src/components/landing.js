import '../assets/css/landing.scss';
import React, { Component } from 'react';
import landingImage from '../assets/images/landing-page-pet.jpg';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { setActiveCaseType, setActiveAnimalSize, setActiveAnimalType, setCaseFilterValues } from "../actions";
import {capitalize} from '../helpers';

class Landing extends Component {

    state = {
        modal: null
    };

    componentDidMount(){
        // Allow BODY to be styled differently for landing page
        document.body.classList.add('landingBody');

        const modal = M.Modal.init(this.refs.modalBegin, {});
        this.setState({modal});
    } 

    componentWillUnmount() {
        // Allow BODY to be styled differently for landing page
        document.body.classList.remove('landingBody');
    }

    handleButtonClick(selectedCaseType) {
        this.props.setActiveCaseType(selectedCaseType);

        this.props.setCaseFilterValues({
            ...this.props.caseFilterValues,
            caseType: selectedCaseType === 'lost' ? 'found' : 'lost'
        });
        this.state.modal.open();
    }

    render(){
        const {activeCaseType} = this.props;
        const searchType = activeCaseType === 'lost' ? 'Found' : 'Lost';

        return(
            <div className="landing bottomContainer">
                <div className="landingContainer">
                    <img className="responsive-img" src={landingImage} alt="dog"/>
                    <div className="landingText">
                        <div className="landingHeading">
                            <p className="landing-title">Getting Pets Home</p>
                            <p className="landing-text">Search for a lost pet or list one found.</p>
                        </div>

                        <div className="btn-container">
                            <button onClick={()=>{this.handleButtonClick('lost')}} className="waves-effect waves-light btn">Lost a Pet ?</button>
                            <button onClick={()=>{this.handleButtonClick('found')}} className="waves-effect waves-light btn">Found a Pet ?</button>
                        </div>
                    </div>
                    <div id="modalBegin" ref="modalBegin" className="modal">
                        <div className="modal-content">
                            <h4>Welcome</h4>
                            <p>How would you like to begin?</p>
                        </div>
                        <div className="modal-footer">
                            <Link to={"/casedescription?caseType=" + searchType.toLowerCase()} className="waves-effect waves-light btn">
                                Go to Pet Search
                            </Link>
                            <Link to={"/upload?caseType=" + activeCaseType} className="waves-effect waves-light btn">Create a Flyer</Link>
                        </div>
                    </div>
                </div>
            </div>
        );    
    }
}

function mapStateToProps(state){
    return {
        activeCaseType: state.activeCase.caseType,
        caseFilterValues: state.caseFilters.values
    };
}

export default connect(mapStateToProps, 
    {setActiveCaseType, setActiveAnimalSize, setActiveAnimalType, setCaseFilterValues})(Landing);