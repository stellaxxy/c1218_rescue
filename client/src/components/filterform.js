import React, {Fragment} from 'react';
import {Field, reduxForm} from 'redux-form';

let FilterForm = props => {
    const {handleSubmit} = props
    return (
        <form onSubmit={handleSubmit}>

            <Field component="input" name="zipcode" placeholder="Zip code" id="zip_code" type="text" className="validate"/>
            <Field component="input" name="city" placeholder="City to search" id="city" type="text" className="validate"/>
            <Field component="input" name="animalType" placeholder="Animal type" id="animalType" type="text" className="validate"/>
            <Field component="input" name="gender" placeholder="Animal gender" id="gender" type="text" className="validate"/>
            <Field component="input" name="size" placeholder="Animal size" id="size" type="text" className="validate"/>
            <Field component="input" name="color" placeholder="Main color" id="color" type="text" className="validate"/>
            <div className="modal-footer">
                <button type="submit" className="modal-close waves-effect waves-green btn-flat">Apply</button>
                <button className="modal-close waves-effect waves-green btn-flat">Close</button>
            </div>

        </form>
    )
}

FilterForm = reduxForm({
    // a unique name for the form
    form: 'filter'
})(FilterForm)

export default FilterForm;