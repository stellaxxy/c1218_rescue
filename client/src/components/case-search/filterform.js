import React, {Fragment} from 'react';

let FilterForm = props => {
    const {onSubmit} = props
    return (
        <form onSubmit={onSubmit}>
            <div className="row">
                <div className="col s12">
                    <input name="caseType" placeholder="Case type" id="case_type" type="text" className="validate" />
                </div>

                <div className="col s12">
                    <input name="zipcode" placeholder="Zip code" id="zip_code" type="text" className="validate" />
                </div>

                <div className="col s12">
                    <input name="city" placeholder="City to search" id="city" type="text" className="validate" />
                </div>

                <div className="col s12">
                    <input name="animalType" placeholder="Animal type" id="animalType" type="text" className="validate" />
                </div>

                <div className="col s12">
                    <input name="size" placeholder="Animal size" id="size" type="text" className="validate" />
                </div>
            </div>

            <div className="modal-footer">
                <button type="submit" className="modal-close waves-effect waves-green btn left">Apply</button>
                 <button type= "reset" className="modal-close waves-effect waves-green btn">Cancel</button>
            </div>

        </form>
    )
}

export default FilterForm;