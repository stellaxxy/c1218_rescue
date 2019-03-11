import React, {Fragment} from 'react';
import { Field, reduxForm } from 'redux-form';
import './upload.scss';

const UploadFormPage5 = props => {
  const { handleSubmit, previousPage } = props
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="prompt">
        <p>If you provide your contact info, we'd be happy to open a case...</p>
      </div>

      <div>
        <label htmlFor="email">Your Email*</label>
        <Field name="email" component="input" type="email" />
      </div>

      <div>
        <label htmlFor="name">Your Name*</label>
        <Field name="name" component="input" type="text" />
      </div>

      <div>
        <label>Additional Notes</label>
        <div>
          <Field name="description" component="textarea" placeholder="Animal color, breed, gender..."/>
        </div>
      </div>

      <div className="btn-panel">
        <button type="button" className="btn" onClick={previousPage}>{"< Prev"}</button>
        <button type="submit" className="btn">{"Submit"}</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'uploadform',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(UploadFormPage5)