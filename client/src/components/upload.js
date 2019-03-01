import '../assets/css/upload.scss';
import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import { capitalize } from '../helpers';

class CaseUpload extends Component {
    state = {
        currentPage: 1
    };

    nextPage() {
        this.setState({
            currentPage: this.state.currentPage + 1
        });
    }

    renderPetFields() {
        const animal_type = 'dog';
        const size = 'medium';

        return (
        <Fragment>
            <div className="file-field input-field col s12">
                <div className="btn">
                    <span>File</span>
                    <input type="file" multiple />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Upload a photo of the pet"/>
                </div>
            </div>
            <div className="input-field col s12">
                <i className="material-icons prefix">mode_edit</i>
                <input disabled value={capitalize(animal_type)} id="animal_type" type="text"/>
                <label htmlFor="case_type">Animal Type</label>
            </div>
            <div className="input-field col s12">
                <i className="material-icons prefix">mode_edit</i>
                <input disabled value={capitalize(size)} id="size" type="text"/>
                <label htmlFor="size">Animal Size</label>
            </div>
            <div className="input-field col s12">
                <input id="color" type="text"/>
                <label htmlFor="color">Animal Colors</label>
            </div>
            <div className="input-field col s12">
                <input id="breed" type="text"/>
                <label htmlFor="breed">Animal Breed</label>
            </div>
            <div className="input-field col s12">
                <textarea id="description" className="materialize-textarea"></textarea>
                <label htmlFor="description">Additional Animal Details</label>
            </div>
        </Fragment>
        );
    }

    renderLocationFields() {
        return <h1>Location</h1>
    }

    renderContactFields() {
        return <h1>Contact</h1>
    }

    renderFields(pageNumber) {
        switch(pageNumber) {
            case 1:
                return this.renderPetFields();
            default:
                return (
                    <Fragment>
                        {this.renderLocationFields()}
                        {this.renderContactFields()}
                    </Fragment>
                );
        }
    }

    render() {
        const case_type = 'found';

        return(
            <div className="page-body">
                <main>
                    <div className="container">
                        <h5>Report A {capitalize(case_type)} Pet</h5>
                        <form action="#">
                        {this.renderFields(this.state.currentPage)}
                        </form>
                    </div>
                </main>

                <footer className="page-footer">
                    <div className="btn-panel">
                        <button className="waves-effect waves-light btn btn-action" onClick={() => {this.nextPage()}}>Cancel</button>
                        <button className="waves-effect waves-light btn btn-action" onClick={() => {this.nextPage()}}>Next</button>
                    </div>
                </footer>
            </div>
        );
    }
}

export default CaseUpload;