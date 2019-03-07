import React from 'react';
import {connect} from 'react-redux';
import UploadForm from './upload_form';
import axios from 'axios';
import {createCaseKey} from '../../helpers';

class UploadPage extends React.Component {
  state = { imageFile: [] };

  handleOnDrop = newImageFile => this.setState({ imageFile: newImageFile });

  submit = values => {
    let data = new FormData();

    for (let [key, value] of Object.entries(values)) {
      
      if (key === 'coverImg') {
        // For now, only send 1st image
        value = value[0];       
      }

      data.append(key, value);
    }

    data.append('caseKey', createCaseKey());
    
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
    return <UploadForm onSubmit={this.submit} onDrop={this.handleOnDrop} imageFile={this.state.imageFile}/>
  }
}

export default UploadPage;