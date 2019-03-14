import React, {Fragment} from 'react';
import { Field, reduxForm } from 'redux-form';
import ImageSelector from '../general/image-selector';

const DescribeFormPage2 = props => {
  const { handleSubmit, previousPage } = props
  return (
    <Fragment>
        <main>
            <form id="describeform" onSubmit={handleSubmit}>
                <div className="row center">
                    <h5>How big is the pet?</h5>
                </div>

                <div className="type-selector">
                    <div className="images">     
                    <Field name="animalSize" component={ImageSelector} label="SMALL" id="small"/> 
                    <Field name="animalSize" component={ImageSelector} label="MEDIUM" id="medium"/>
                    <Field name="animalSize" component={ImageSelector} label="LARGE" id="large"/>
                    </div>
                </div>
            </form>
        </main>
        <footer>
            <div className="btn-panel">
                <button type="button" className="btn" onClick={previousPage}>{"< Prev"}</button>
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
})(DescribeFormPage2)