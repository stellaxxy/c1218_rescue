import React, {Fragment} from 'react';
import { Field, reduxForm } from 'redux-form';
import './upload.scss';

const UploadFormPage4 = props => {
  const { handleSubmit, previousPage } = props
  return (
    <Fragment>
    <div className="container">
      <main>
        <form id="uploadform" autoComplete="off" onSubmit={handleSubmit}>
          <div className="prompt">
            <p>When and where was the pet last seen?</p>
          </div>

          <div>
            <label htmlFor="street">Location*</label>
            <Field name="street" component="input" type="text" placeholder="Street address or cross streets" />
          </div>

          <div>
            <label htmlFor="city">City*</label>
            <Field name="city" component="input" type="text" />
          </div>

          <div>
            <label htmlFor="caseDate">Date*</label>
            <Field name="caseDate" component="input" type="text" />
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
})(UploadFormPage4)