import React, {Fragment} from 'react';
import { Field, reduxForm } from 'redux-form';
import './upload.scss';
import ImageSelector from '../general/image-selector';

const UploadFormPage3 = props => {
  const { handleSubmit, previousPage } = props
  return (
    <Fragment>
    <div className="container">
      <main>
      <form id="uploadform" autoComplete="off" onSubmit={handleSubmit}>
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
})(UploadFormPage3)