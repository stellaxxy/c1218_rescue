import './upload.scss';
import React, {Component} from 'react';
import UploadForm from './upload_form';
import UploadConfirmation from './upload_confirmation';
import { connect } from 'react-redux';


class CaseUpload extends Component {
    state = {
        submitted: false,
        currentPage: 1,
        caseType: 'found',
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
        console.log('Submitted');
        this.setState({
            submitted: true
        });
    }
/*
    componentDidMount(){

        const { caseType, animalType, animalSize } = this.props;
        this.setState({caseType, animalType, animalSize});
    }
*/
    render() {
        console.log('upload state', this.props);
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
            console.log('Was submitted');
            return (
                <UploadConfirmation/>
            );
        }
    }
}


function mapStateToProps(state) {
    return {
        caseType: state.activeCase.caseType,
        animalType: state.activeCase.animalType,
        animalSize: state.activeCase.animalSize
    };
}

export default connect(mapStateToProps)(CaseUpload);