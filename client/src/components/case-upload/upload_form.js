import React, {Component, Fragment} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import DropZoneField from '../general/dropzone/dropzone_field';
import InputField from '../general/input-field';
import {isRequired} from '../../helpers/validate';
import './upload.scss';

class UploadForm extends Component {
  componentDidMount() {
    var elems = document.querySelectorAll('input[name="caseDate"]');
    var instances = M.Datepicker.init(elems, {format: 'mm/dd/yyyy'});
  }

  render() {
    const { handleSubmit, isUpdate, onSubmit, onDrop, onReturn, imageFile, id } = this.props;

    return (
        <div className="page-body">
          <main>
            <div className="container">
              <h5>Pet Details</h5>

              <form id="uploadform" autoComplete="off" onSubmit={handleSubmit}>

              <Field
                name="coverImg"
                component={DropZoneField}
                type="file"
                imagefile={imageFile}
                handleOnDrop={onDrop}
                validate={[isRequired]}
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
                  <Field name="street" component={InputField} validate={isRequired} type="text" placeholder="Street address or cross streets"/>
                </div>

                <div>
                  <label htmlFor="city">City Pet Last Seen*</label>
                  <Field name="city" component="input" type="text" component={InputField} validate={isRequired} placeholder="Zipcode or City, State" />
                </div>

                <div>
                  <label htmlFor="email">Your Email*</label>
                  <Field name="email" component={InputField} validate={isRequired} type="email" />
                </div>

                <div>
                  <label htmlFor="name">Your Name*</label>
                  <Field name="name" component={InputField} validate={isRequired} type="text" />
                </div>

                <div>
                  <label htmlFor="phone">Your Phone*</label>
                  <Field name="phone" component={InputField} validate={isRequired} type="text" />
                </div>

                <div>
                  <label htmlFor="caseDate">Date Pet Last Seen*</label>
                  <Field name="caseDate" component={InputField} validate={isRequired} type="text" />
                </div>

                <div>
                  <label>Notes</label>
                  <div>
                    <Field name="description" component="textarea" placeholder="Animal color, breed, gender..."/>
                  </div>
                </div>

                  {
                    isUpdate ?
                        ''
                        :
                        (<div className="formCheckBox">
                            <Field type="checkbox" component="input" name="terms" value="termsAccepted" checked/>
                            <label> I accept and agree to the <Link to="#">Terms of Use</Link>.</label>
                        </div>)
                  }


              </form>

            </div>
          </main>
            {
              isUpdate ? (<div className="uploadSubmitBtnContainer">
                  <button className="waves-effect waves-light btn btn-action uploadSubmitBtn" form="uploadform" type="button" onClick={onReturn}>Go Back</button>
                  <button className="waves-effect waves-light btn btn-action uploadSubmitBtn" form="uploadform" type="submit">Submit</button>
              </div>) : (<div className="uploadSubmitBtnContainer">
                  <button className="waves-effect waves-light btn btn-action uploadSubmitBtn" form="uploadform" type="submit">Submit</button>
              </div>)
            }

        </div>
    );
  }
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