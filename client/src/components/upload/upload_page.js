import React from 'react';
import {connect} from 'react-redux';
import UploadFormPage1 from './upload_form_page1';
import axios from 'axios';

const HARD_CODED = {
  breed: 'DUMMY BREED',
  color: 'DUMMY COLOR',
  username: 'DUMMY USERNAME',
  gender: 'DUMMY GENDER',
  description: 'DUMMY DESCRIPTION',
  city: 'Irvine',
  street: 'Spectrum Center Drive',
  zipcode: '92618'
};

class UploadPage extends React.Component {
  state = { imageFile: [] };

  handleOnDrop = newImageFile => this.setState({ imageFile: newImageFile });

  submit = values => {
    let data = new FormData();

    // Hard-Coded Values
    for (let [key, value] of Object.entries(HARD_CODED)) {
      data.append(key, value);
    }

    // Real Values
    for (let [key, value] of Object.entries(values)) {
      // For now, only send 1st image
      if (key === 'coverImg') {
        value = value[0];       
      } else if (key === 'caseDate') {
        value = new Date(value).toISOString().split('T')[0];
      }
      data.append(key, value);
    }

    axios({
      method: 'post',
      url: '/api/createcase',
      data: data,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
          //handle success
          console.log('success: ', response);
    })
    .catch(function (response) {
          //handle error
          console.log('error: ', response);
    });
  }

  render() {
    return <UploadFormPage1 onSubmit={this.submit} onDrop={this.handleOnDrop} imageFile={this.state.imageFile}/>
  }
}

export default UploadPage;