import React, {Fragment} from 'react';
import { Field, reduxForm } from 'redux-form';
import './update_form.scss';

let UpdateForm = (props) => {
    const { onSubmit, handleSubmit } = props;
   // console.log('props', props);
  return (
      <div className='updateForm'>
          <h5>Update Information</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                  <label>Case Type</label>
                  <div className="row">
                      <label className="col s6"><Field name='caseType' component="input" type="radio" value="lost"/><span>Lost</span></label>
                      <label className="col s6"><Field name='caseType' component="input" type="radio" value="found"/><span>Found</span></label>
                  </div>
              </div>
              <div>
                  <label>Animal Type</label>
                  <div className="row">
                      <label className="col s4"><Field name='animalType' component="input" type="radio" value="dog"/><span>Dog</span></label>
                      <label className="col s4"><Field name='animalType' component="input" type="radio" value="cat"/><span>Cat</span></label>
                      <label className="col s4"><Field name='animalType' component="input" type="radio" value="other"/><span>Other</span></label>
                  </div>
              </div>
              <div>
                  <label>Animal Size</label>
                  <div className="row">
                      <label className="col s4"><Field name='animalSize' component="input" type="radio" value="large"/><span>Large</span></label>
                      <label className="col s4"><Field name='animalSize' component="input" type="radio" value="medium"/><span>Medium</span></label>
                      <label className="col s4"><Field name='animalSize' component="input" type="radio" value="small"/><span>Small</span></label>
                  </div>
              </div>
              <div>
                  <label htmlFor="street">Location</label>
                  <Field name="street" component="input" type="text" placeholder="Street address or cross streets" />
              </div>
              <div>
                  <label htmlFor="city">City Pet Last Seen*</label>
                  <Field name="city" component="input" type="text" placeholder="Zipcode or City, State" />
              </div>
              <div>
                  <label htmlFor="caseDate">Date Pet Last Seen</label>
                  <Field name="caseDate" component="input" type="text" />
              </div>
              <div>
                  <label htmlFor="phone">Your Phone</label>
                  <Field name="phone" component="input" type="text" />
              </div>
              <div>
                  <label>Notes</label>
                  <div>
                      <Field name="description" component="textarea" placeholder="Animal color, breed, gender..."/>
                  </div>
              </div>
              <div>
                  <button>UPDATE</button>
              </div>
          </form>
      </div>
  )
};

export default reduxForm({
    form: 'update_form',
})(UpdateForm);