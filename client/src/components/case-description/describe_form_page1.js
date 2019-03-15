import React, {Fragment} from 'react';
import { Field, reduxForm } from 'redux-form';
import ImageSelector from '../general/image-selector';

const DescribeFormPage1 = props => {
  const { handleSubmit, previousPage } = props
  return (
      <Fragment>
        <main>
            <form id="describeform" onSubmit={handleSubmit}>
                <div className="row center">
                    <h5>What type of pet is it?</h5>
                </div>

                <div className="type-selector">
                    <div className="images">     
                    <Field name="animalType" component={ImageSelector} label="DOG" id="dog"/> 
                    <Field name="animalType" component={ImageSelector} label="CAT" id="cat"/>
                    <Field name="animalType" component={ImageSelector} label="OTHER" id="other"/>
                    </div>
                </div>
            </form>
        </main>
        <footer>
            <div className="btn-panel">
                <button type="button" className="btn" onClick={props.goToLanding}>{"< Prev"}</button>
                <button type="submit" className="btn" form="describeform">{"Next >"}</button>
            </div>
        </footer>
      </Fragment>
  )
}

export default reduxForm({
  form: 'describeform',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(DescribeFormPage1)