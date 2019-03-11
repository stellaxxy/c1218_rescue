import React, {Fragment} from 'react';
import { Field, reduxForm } from 'redux-form';
import './upload.scss';
import ImageSelector from '../general/image-selector';

const UploadFormPage3 = props => {
  const { handleSubmit, previousPage } = props
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="prompt">
        <p>How big is it?</p>
      </div>

      <div className="type-selector">
        <div className="images">     
          <Field name="animalSize" component={ImageSelector} label="SMALL" id="small"/> 
          <Field name="animalSize" component={ImageSelector} label="MEDIUM" id="medium"/>
          <Field name="animalSize" component={ImageSelector} label="LARGE" id="large"/>
        </div>
      </div>

      <div className="btn-panel">
        <button type="button" className="btn" onClick={previousPage}>{"< Prev"}</button>
        <button type="submit" className="btn">{"Next >"}</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'uploadform',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(UploadFormPage3)