import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import UploadFormPage1 from './upload_form_page1';
import UploadFormPage2 from './upload_form_page2';
import UploadFormPage3 from './upload_form_page3';
import UploadFormPage4 from './upload_form_page4';
import UploadFormPage5 from './upload_form_page5';
import {createCaseKey} from '../../helpers';
import './upload.scss';

class UploadForm extends Component {

    constructor(props) {
        super(props)
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
        this.state = {
            page: 1,
            imageFile: [],
            uploading: false            
        }
    }

    handleOnDrop = newImageFile => this.setState({ imageFile: newImageFile });

    handleSubmit = async values => {
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

            const params = queryString.parse(this.props.location.search);
            if (!params.caseType) {
                throw new Error('QueryStringParameter caseType is missing');
            }

            data.append('caseType', params.caseType);

            const response = await axios({
                method: 'post',
                url: '/api/createcase',
                data: data,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            });



            caseId = response.data.insertID;
            caseKey = response.data.caseKey;
        } catch (error) {
            console.log('Had an error');
        }
        
        caseId = caseId ? caseId : 0;
        this.props.history.push(`/upload-complete/${caseId}/${caseKey}`);
    }

    nextPage() {
        this.setState({ page: this.state.page + 1 })
    }

    previousPage() {
        this.setState({ page: this.state.page - 1 })
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
        const { page } = this.state;

        return (
            <div className="upload-form">
                {page === 1 && <UploadFormPage1 onSubmit={this.nextPage}  onDrop={this.handleOnDrop} imageFile={this.state.imageFile} />}
                {page === 2 && <UploadFormPage2 previousPage={this.previousPage} onSubmit={this.nextPage} />}
                {page === 3 && <UploadFormPage3 previousPage={this.previousPage} onSubmit={this.nextPage} />}
                {page === 4 && <UploadFormPage4 previousPage={this.previousPage} onSubmit={this.nextPage} />}
                {page === 5 && <UploadFormPage5 previousPage={this.previousPage} onSubmit={this.handleSubmit} />}
                {this.renderSpinner()}
            </div>
        )
    }
}

export default UploadForm;