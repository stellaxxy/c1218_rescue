import './upload.scss';
import React, {Component} from 'react';
import UploadForm from './upload_form';
import UploadConfirmation from './upload_confirmation';

class CaseUpload extends Component {
    state = {
        submitted: false,
        currentPage: 1,
        caseType: 'lost',
        animalType: 'dog',
        animalSize: 'medium'
    };

    handleNextPage() {
        this.setState({
            currentPage: this.state.currentPage + 1
        });
    }

    handlePrevPage() {
        this.setState({
            currentPage: this.state.currentPage - 1
        });
    }

    handleSubmit() {
        this.setState({
            submitted: true
        });
    }

    render() {
        const {submitted, currentPage, caseType, animalType} = this.state;

        if (!submitted) {
            return (
                <UploadForm
                    onNextPage={() => {this.handleNextPage()}}
                    onPrevPage={() => {this.handlePrevPage()}}
                    onSubmit={() => {this.handleSubmit()}}
                    {...this.state}/>
            );
        } else {
            return (
                <UploadConfirmation/>
            );
        }
    }
}


export default CaseUpload;