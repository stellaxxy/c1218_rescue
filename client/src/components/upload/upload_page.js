import React from 'react';
import {connect} from 'react-redux';
import UploadFormPage1 from './upload_form_page1';

class UploadPage extends React.Component {
  submit = values => {
    console.log(values);
    console.log('props: ', this.props.caseupload.values);
  }
  render() {
    return <UploadFormPage1 onSubmit={this.submit} />
  }
}

function mapStateToProps(state) {
  console.log('Redux state: ', state);
  return {
    caseupload: state.form.caseupload
  };
}

export default connect(mapStateToProps)(UploadPage);