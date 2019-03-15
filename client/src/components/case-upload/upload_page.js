import React, {Component} from 'react';
import UploadForm from './upload_form';
import axios from 'axios';
import {createCaseKey} from '../../helpers';

class UploadPage extends Component {
  state = { 
    imageFile: [],
    uploading: false
  };

  //-----------------------------------------------------------------------------------------
  // STORE SELECTED PHOTO IN STATE
  //----------------------------------------------------------------------------------------- 
  handleOnDrop = newImageFile => this.setState({ imageFile: newImageFile });

  //-----------------------------------------------------------------------------------------
  // CREATE CASE / FLYER
  //----------------------------------------------------------------------------------------- 
  submit = async values => {
    let caseId = 0;
    let caseKey = 0;

    try {
      // TRIGGERS RENDER WITH SPINNER
      this.setState({uploading: true});

      // COLLECT USER INPUT INTO FORM DATA FOR POST REQUEST
      let data = new FormData();
      for (let [key, value] of Object.entries(values)) {
        
        if (key === 'coverImg') {
          // CURRENTLY ONLY SEND 1 IMAGE
          value = value[0];       
        }
  
        data.append(key, value);
      }
  
      // GENERATE & ADD A CASE KEY
      data.append('caseKey', createCaseKey());
  
      // CALL ENDPOINT
      const response = await axios({
        method: 'post',
        url: '/api/createcase',
        data: data,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
      });

      // GET CASEID AND CASE KEY FROM RESPONSE
      caseId = response.data.insertID;
      caseKey = response.data.caseKey;

      // REDIRECT TO UPLOAD CONFIRMATION PAGE
      this.props.history.push(`/upload-complete/${caseId}/${caseKey}`);
    } catch (error) {
      this.props.history.push(`/upload-complete/0/0`);

    }
    
  }

  renderSpinner() {
    const {uploading} = this.state;

    return (
      <div className={"preloader-wrapper big " + (uploading ? 'active' : '')}>
        <div className="spinner-layer spinner-green-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    // Have to reset because Materialize modals set to HIDDEN
    document.body.style.overflow = "";

    return (
      <div>
        <UploadForm onSubmit={this.submit} onDrop={this.handleOnDrop} imageFile={this.state.imageFile}/>
        {this.renderSpinner()}
      </div>     
    );
  }
}

export default UploadPage;