import React, {Component, Fragment} from 'react';
import UploadForm from './upload_form';
import axios from 'axios';
import {createCaseKey} from '../../helpers';
import BullDog from '../../assets/images/FrenchBulldog.gif';
import OrangeBone from '../../assets/images/dogBoneOrange.png';
import BrownBone from '../../assets/images/dog-bone-brown-hi.png';

class UploadPage extends Component {
  state = { 
      imageFile: [],
      uploading: false,
      petFound : null,
      memberTotal: null
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

  async componentDidMount(){
    const petFoundResult = await axios.get('/api/petfound');
    const memberTotalResult = await axios.get('/api/memebertotal');

    const petFound = petFoundResult.data.successCount;
    const memberTotal = memberTotalResult.data.memberCount;

    this.setState({
        petFound,
        memberTotal
    });

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
        <Fragment>
            <div className="leftUploadDiv">
              <img src={BullDog}/>
            </div>
            <div className="uploadDiv">
                <UploadForm onSubmit={this.submit} onDrop={this.handleOnDrop} imageFile={this.state.imageFile}/>
                {this.renderSpinner()}
            </div>
            <div className="rightUploadDiv">
                <div className="rightUploadContent">
                    <h5>Our Reach</h5>
                    <p>
                        Pet Found: {this.state.petFound}
                    </p>
                    <p>
                        Members: {this.state.memberTotal}
                    </p>
                    <img className="orangeBone leftTiltedOrangeBone" src={OrangeBone}/>
                    <img className="brownBone" src={BrownBone}/>
                    <img className="orangeBone tiltedOrangeBone" src={OrangeBone}/>
                    <img className="brownBone tiltedBrownBone" src={BrownBone}/>
                </div>
            </div>
        </Fragment>
    );
  }
}

export default UploadPage;