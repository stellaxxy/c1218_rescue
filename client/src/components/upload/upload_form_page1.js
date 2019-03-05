import React, {Fragment} from 'react';
import { Field, reduxForm } from 'redux-form';
import DropZoneField from './dropzone_field';
import './upload.scss';

const imageIsRequired = value => (!value ? "Required" : undefined);

let UploadFormPage1 = props => {
  const { handleSubmit } = props;
  return (
    <Fragment>
      <div className="page-body">
        <main>
          <div className="container">
            <h5>Upload Pet Info</h5>

            <form id="uploadform" autoComplete="off" onSubmit={handleSubmit}>

            <Field
              name="coverImg"
              component={DropZoneField}
              type="file"
              imagefile={props.imageFile}
              handleOnDrop={props.onDrop}
              validate={[imageIsRequired]}
              />

              <div>
                <label>Case Type*</label>
                <div className="row">
                  <label className="col s6"><Field name="caseType" component="input" type="radio" value="lost"/><span>Lost Animal</span></label>
                  <label className="col s6"><Field name="caseType" component="input" type="radio" value="found"/><span>Found Animal</span></label>
                </div>
              </div>

              <div>
                <label>Animal Type*</label>
                <div className="row">
                  <label className="col s4"><Field name="animalType" component="input" type="radio" value="cat"/><span>Cat</span></label>
                  <label className="col s4"><Field name="animalType" component="input" type="radio" value="dog"/><span>Dog</span></label>
                  <label className="col s4"><Field name="animalType" component="input" type="radio" value="other"/><span>Other</span></label>
                </div>
              </div>

              <div>
                <label>Animal Size*</label>
                <div className="row">
                  <label className="col s4"><Field name="size" component="input" type="radio" value="small"/><span>Small</span></label>
                  <label className="col s4"><Field name="size" component="input" type="radio" value="medium"/><span>Medium</span></label>
                  <label className="col s4"><Field name="size" component="input" type="radio" value="large"/><span>Large</span></label>
                </div>
              </div>

              <div>
                <label htmlFor="location">Location Pet Last Seen*</label>
                <Field name="location" component="input" type="text" placeholder="Zipcode or City, State" />
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
                <label htmlFor="phone">Your Phone</label>
                <Field name="phone" component="input" type="text" />
              </div>

              <div>
                <label htmlFor="caseDate">Date Pet Last Seen</label>
                <Field name="caseDate" component="input" type="text" />
              </div>

              <div>
                <label>Notes</label>
                <div>
                  <Field name="description" component="textarea" placeholder="Animal color, breed, gender..."/>
                </div>
              </div>

            </form>

          </div>
        </main>

        <footer className="page-footer">
          <div className="btn-panel">
            <button className="waves-effect waves-light btn btn-action" form="uploadform" type="submit">Submit</button>
          </div>
        </footer>
      </div>
    </Fragment>
  )
}

UploadFormPage1 = reduxForm({
  form: 'caseupload',
  initialValues: {caseDate: new Date().toLocaleDateString()}
})(UploadFormPage1);

export default UploadFormPage1;