import React, {Fragment} from 'react';
import { Field, reduxForm } from 'redux-form';
import './upload.scss';

const UploadFormPage5 = props => {
  const { handleSubmit, previousPage } = props
  return (
    <Fragment>
    <div className="container">
      <main>
        <form id="uploadform" autoComplete="off" onSubmit={handleSubmit}>
          <div className="prompt">
            <p>We're almost done.  Please provide your contact info to open a case.</p>
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
        </form>
      </main>
    </div>

    <footer>
      <div className="btn-panel">
        <button type="button" className="btn" onClick={previousPage}>{"< Prev"}</button>
        <button type="submit" form="uploadform" className="btn">{"Submit"}</button>
      </div>
    </footer>
    </Fragment>
  )
}

export default reduxForm({
  form: 'uploadform',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(UploadFormPage5)