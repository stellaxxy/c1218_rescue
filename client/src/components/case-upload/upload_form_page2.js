import React, { Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import ImageSelector from '../general/image-selector';

const UploadFormPage2 = props => {
  const { handleSubmit, previousPage } = props
  return (
    <Fragment>
    <div className="container">
      <main>
        <form id="uploadform" onSubmit={handleSubmit}>
          <div className="prompt">
            <p>What type of pet is it?</p>
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
    </div>

    <footer>
      <div className="btn-panel">
          <button type="button" className="btn" onClick={previousPage}>{"< Prev"}</button>
          <button type="submit" form="uploadform" className="btn">{"Next >"}</button>
      </div>
    </footer>
    </Fragment>
  )
}

export default reduxForm({
  form: 'uploadform',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(UploadFormPage2)