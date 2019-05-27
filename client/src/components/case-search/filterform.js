import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import InputField from '../general/input-field';

class FilterForm extends Component {

    render(){
        const {handleSubmit, initialValues} = this.props;
        return(
            <div className="formDiv">
                <form className="listForm" onSubmit={handleSubmit} id="searchForm">
                    <h5>What are you searching for?</h5>
                    <div>
                        <div className="radioFound">
                            <label>
                                <Field component="input" type="radio" name="caseType" value="found"/>
                                <span>Found Pets</span>
                            </label>
                        </div>
                        <div className="radioLost">
                            <label>
                                <Field component="input" type="radio" name="caseType" value="lost"/>
                                <span>Missing Pets</span>
                            </label>
                        </div>
                    </div>

                    <div className="locationDiv">
                        <h5>Location:</h5>
                        <h6>City or Zip Code</h6>
                        <Field name="city" component={InputField} type="text" placeholder="City to search"/>
                        <Field name="zipcode" component={InputField} type="text" placeholder="Zip code"/>
                    </div>
                    <div className="animalDiv">
                        <h5>Animal:</h5>
                        <h6>Type</h6>
                        <Field id="type" className="selectOpt" name="animalType" component="select">
                            <option value="">All Species</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="other">Other</option>
                        </Field>
                        <h6>Size</h6>
                        <Field id="size" className="selectOpt" name="animalSize" component="select">
                            <option value="">All Size</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </Field>
                    </div>
                    <button className="searchBtn waves-effect waves-light btn-small">SEARCH</button>
                </form>
            </div>
        );
    }
}

FilterForm = reduxForm({
    form: 'filter',

})(FilterForm);

export default FilterForm;
