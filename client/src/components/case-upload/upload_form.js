import React, {Fragment} from 'react';
import { Field, reduxForm } from 'redux-form';
import DropZoneField from '../general/dropzone/dropzone_field';
import './upload.scss';

const imageIsRequired = value => (!value ? "Required" : undefined);

let UploadForm = props => {
  const { handleSubmit, isUpdate, onSubmit, onReturn } = props;

  return (
      <div className="page-body">
        <main>
          <div className="container">
            <h5>Pet Details</h5>

            <form id="uploadform" autoComplete="off" onSubmit={isUpdate ? handleSubmit(onSubmit) : handleSubmit}>

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
                  <label className="col s4"><Field name="animalSize" component="input" type="radio" value="small"/><span>Small</span></label>
                  <label className="col s4"><Field name="animalSize" component="input" type="radio" value="medium"/><span>Medium</span></label>
                  <label className="col s4"><Field name="animalSize" component="input" type="radio" value="large"/><span>Large</span></label>
                </div>
              </div>

              <div>
                <label htmlFor="street">Location Pet Last Seen*</label>
                <Field name="street" component="input" type="text" placeholder="Street address or cross streets" />
              </div>

              <div>
                <label htmlFor="city">City Pet Last Seen*</label>
                <Field name="city" component="input" type="text" placeholder="Zipcode or City, State" />
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
          {
            isUpdate ? (<div className="uploadSubmitBtnContainer">
                <button className="waves-effect waves-light btn btn-action uploadSubmitBtn" form="uploadform" type="submit">Submit</button>
                <button className="waves-effect waves-light btn btn-action uploadSubmitBtn" form="uploadform" type="button" onClick={onReturn}>Go Back</button>
            </div>) : (<div className="uploadSubmitBtnContainer">
                <button className="waves-effect waves-light btn btn-action uploadSubmitBtn" form="uploadform" type="submit">Submit</button>
            </div>)
          }

      </div>
  )
}

UploadForm = reduxForm({
    form: 'caseupload',
    initialValues: {caseDate: new Date().toLocaleDateString()},

})(UploadForm);

export default UploadForm;

/*
<footer className="page-footer">

        </footer>
 */