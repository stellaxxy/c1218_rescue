import React from 'react';
import {connect} from 'react-redux';
import UploadForm from './upload_form';
import axios from 'axios';
import {createCaseKey} from '../../helpers';

class UploadPage extends React.Component {
  state = { 
    imageFile: [],
    uploading: false
  };

  handleOnDrop = newImageFile => this.setState({ imageFile: newImageFile });

  submit = async values => {
    let caseId = 0;
    let caseKey = 0;

    try {
      this.setState({uploading: true});

      let data = new FormData();

      for (let [key, value] of Object.entries(values)) {
        
        if (key === 'coverImg') {
          // For now, only send 1st image
          value = value[0];       
        }
  
        data.append(key, value);
      }
  
      data.append('caseKey', createCaseKey());
  
      const response = await axios({
        method: 'post',
        url: '/api/createcase',
        data: data,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
      });
      
      caseId = response.data.insertID;
      caseKey = response.data.caseKey;

      console.log('response', response);
    } catch (error) {
      console.log('Had an error');
    }
 
    this.props.history.push(`/upload-complete/${caseId}/${caseKey}`);
    console.log('caseId: ', caseId);
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
    return (
      <div>
        {this.renderSpinner()}
        <UploadForm onSubmit={this.submit} onDrop={this.handleOnDrop} imageFile={this.state.imageFile}/>
      </div>     
    );
  }
}

export default UploadPage;