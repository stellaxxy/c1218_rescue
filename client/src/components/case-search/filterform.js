import React, { Component } from 'react';
import queryString from 'query-string';

class Filter extends Component {
    onSubmit = ()=>{
        event.preventDefault();
        const inputObj = {};
        if(document.querySelector('input[name="caseType"]:checked')){
            inputObj.caseType = document.querySelector('input[name="caseType"]:checked').value;
        }

        inputObj.city = document.getElementById('city').value;

        inputObj.zipcode = document.getElementById('zipCode').value;

        inputObj.animalType = document.getElementById('type').value;

        inputObj.animalSize = document.getElementById('size').value;

        const queryObj = {mode: 'list'};
        for(let [key, value] of Object.entries(inputObj)){
            if(value){
                queryObj[key] = value;
            }
        }

        this.props.onFilterChange(queryObj);
    };

    render(){

        return(
            <div className="formDiv">
                <form className="listForm" onSubmit={this.onSubmit}>
                    <h5>Pet Reported As:</h5>
                    <div className="radioFound">
                        <label htmlFor="found">Found</label>
                        <input className="radioBtn" type="radio" name="caseType" value="lost" id="found" defaultChecked={this.props.filterValues.caseType==='lost' ? 'checked':''}/>
                    </div>
                    <div className="radioLost">
                        <label htmlFor="lost">Lost</label>
                        <input className="radioBtn" type="radio" name="caseType" value="found" id="lost" defaultChecked={this.props.filterValues.caseType==='found' ? 'checked':''}/>
                    </div>
                    <div className="locationDiv">
                        <h5>Location:</h5>
                        <h6>City or Zip Code</h6>
                        <input id="city" type="text" placeholder="City to search" defaultValue={this.props.filterValues.city || ""}/>
                        <input id="zipCode" type="text" placeholder="Zip code" defaultValue={this.props.filterValues.zipcode || ""}/>
                    </div>
                    <div className="animalDiv">
                        <h5>Animal:</h5>
                        <h6>Type</h6>
                        <select id="type" className="selectOpt" name="animalType" defaultValue={this.props.filterValues.animalType || ""}>
                            <option value="">All Species</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="others">Others</option>
                        </select>
                        <h6>Size</h6>
                        <select id="size" className="selectOpt" name="animalSize" defaultValue={this.props.filterValues.animalSize || ""}>
                            <option value="">All Size</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>
                    <button className="searchBtn waves-effect waves-light btn-small">SEARCH</button>
                </form>
            </div>
        );
    }
}

export default Filter;