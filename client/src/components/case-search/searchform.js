import React, { Component } from 'react';
import queryString from 'query-string';

class SearchForm extends Component {
    //-----------------------------------------------------------------------------------------
    // HANDLE SUBMIT FILTER VALUE
    //-----------------------------------------------------------------------------------------
    onSubmit = () => {
        event.preventDefault();
        let formData = new FormData(event.target);

        const filters = {};
        for (let [key, value] of formData.entries()) {
            if (value) filters[key] = value;
        }

        this.props.history.push('/search?' + queryString.stringify(filters));
    };
    //-----------------------------------------------------------------------------------------
    // HANDLE FILTER FORM CANCEL CLICK
    //-----------------------------------------------------------------------------------------
    onCancel = () => {
        this.props.history.push('/search' + this.props.history.location.search);

    };
    //-----------------------------------------------------------------------------------------
    // RENDER
    //-----------------------------------------------------------------------------------------
    render() {
        const {caseType, zipcode, city, animalType, size, mode} = queryString.parse(this.props.location.search);

        return (
            <div className="row">
                <form className="col s10 offset-s1" onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col s12">
                            <input name="caseType" defaultValue={caseType} placeholder="Case type" id="case_type" type="text" className="validate" />
                        </div>

                        <div className="col s12">
                            <input name="zipcode" defaultValue={zipcode} placeholder="Zip code" id="zip_code" type="text" className="validate" />
                        </div>

                        <div className="col s12">
                            <input name="city" defaultValue={city} placeholder="City to search" id="city" type="text" className="validate" />
                        </div>

                        <div className="col s12">
                            <input name="animalType" defaultValue={animalType} placeholder="Animal type" id="animalType" type="text" className="validate" />
                        </div>

                        <div className="col s12">
                            <input name="animalSize" defaultValue={size} placeholder="Animal size" id="animalSize" type="text" className="validate" />
                        </div>

                        <input type="hidden" name="mode" defaultValue={mode} />
                    </div>

                    <div className="modal-footer">
                        <button type="submit" className="modal-close waves-effect waves-green btn left">Apply</button>
                        <button type= "reset" className="modal-close waves-effect waves-green btn" onClick={this.onCancel}>Cancel</button>
                    </div>

                </form>
            </div>

        );
    }
}

export default SearchForm;