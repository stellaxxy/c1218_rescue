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

        //console.log(inputObj);
        const queryObj = {mode: 'list'};
        for(let [key, value] of Object.entries(inputObj)){
            if(value){
                queryObj[key] = value;
            }
        }
        //console.log(queryObj);
        this.props.onFilterChange(queryObj);
        //const query = queryString.stringify(queryObj);
       // console.log(query);
       // this.props.history.push('/search?' + query);
    }

    render(){
        return(
            <div className="formDiv">
                <form className="listForm" onSubmit={this.onSubmit}>
                    <h5>Pet Reported As:</h5>
                    <div className="radioFound">
                        <label htmlFor="found">Found</label>
                        <input className="radioBtn" type="radio" name="caseType" value="lost" id="found"/>
                    </div>
                    <div className="radioLost">
                        <label htmlFor="lost">Lost</label>
                        <input className="radioBtn" type="radio" name="caseType" value="found" id="lost"/>
                    </div>
                    <div className="locationDiv">
                        <h5>Location:</h5>
                        <h6>City or Zip Code</h6>
                        <input id="city" type="text" placeholder="City to search"/>
                        <input id="zipCode" type="text" placeholder="Zip code"/>
                    </div>
                    <div className="animalDiv">
                        <h5>Animal:</h5>
                        <h6>Type</h6>
                        <select id="type" className="selectOpt" name="animalType">
                            <option value="">All Species</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="others">Others</option>
                        </select>
                        <h6>Size</h6>
                        <select id="size" className="selectOpt" name="animalSize">
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