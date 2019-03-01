import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import { capitalize } from '../../helpers';

class UploadForm extends Component {
    datepicker = React.createRef();

    componentDidMount() {
        // TODO: Need to get datepicker to work
        var elems = [this.datepicker];
        M.Datepicker.init(elems, {container: 'page-body'});
    }

    renderPetFields() {
        const {animalType, animalSize} = this.props;

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
                <input disabled value={capitalize(animalType)} id="animal_type" type="text"/>
                <label htmlFor="case_type" className="active">Animal Type</label>
            </div>
            <div className="input-field col s12">
                <i className="material-icons prefix">mode_edit</i>
                <input disabled value={capitalize(animalSize)} id="size" type="text"/>
                <label htmlFor="size" className="active">Animal Size</label>
            </div>
            <div className="input-field col s12">
                <input id="animal_name" type="text"/>
                <label htmlFor="animal_name">Animal Name</label>
            </div>
            <div className="input-field col s12">
                <input id="color" type="text"/>
                <label htmlFor="color">Animal Colors</label>
            </div>
            <div className="input-field col s12">
                <input id="breed" type="text"/>
                <label htmlFor="breed">Animal Breed</label>
            </div>
        </Fragment>
        );
    }

    renderLocationFields() {
        return (
            <Fragment>
                <div className="input-field col s12">
                    <i className="material-icons prefix">location_on</i>
                    <input id="location" type="text" className="validate"/>
                    <label htmlFor="location">Location Found</label>
                </div> 
                <div className="input-field col s12">
                    <i className="material-icons prefix">event</i>
                    <input  id="case_date" type="text" className="datepicker" ref={this.datepicker}/>
                    <label htmlFor="pickDate">Date Found</label>
                </div>               
            </Fragment>
        );
    }

    renderContactFields() {
        return (
            <Fragment>
                <div className="input-field col s12">
                    <i className="material-icons prefix">account_circle</i>
                    <input id="contact_name" type="text" className="validate"/>
                    <label htmlFor="contact_name">Contact Name</label>
                </div>
                <div className="input-field col s12">
                    <i className="material-icons prefix">phone</i>
                    <input id="phone" type="tel" className="validate"/>
                    <label htmlFor="phone">Contact Phone</label>
                </div>
                <div className="input-field col s12">
                    <i className="material-icons prefix">email</i>
                    <input id="email" type="email" className="validate"/>
                    <label htmlFor="email">Contact Email</label>
                </div>
                <div className="input-field col s12">
                    <textarea id="description" className="materialize-textarea"></textarea>
                    <label htmlFor="description">Additional Notes</label>
                </div>
            </Fragment>
        );
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

    renderButtons(pageNumber) {
        const {onNextPage, onPrevPage, onSubmit} = this.props;

        switch(pageNumber) {
            case 1:
                return (
                    <Fragment>
                        <Link className="waves-effect waves-light btn btn-action" to="/">Cancel</Link>
                        <button className="waves-effect waves-light btn btn-action" onClick={onNextPage}>Next</button>
                    </Fragment>
                );
            default:
                return (
                    <Fragment>
                        <button className="waves-effect waves-light btn btn-action" onClick={onPrevPage}>Prev</button>
                        <button className="waves-effect waves-light btn btn-action" onClick={onSubmit}>Submit</button>
                    </Fragment>
                );
        }
    }

    render(props) {
        const {caseType, animalType, animalSize} = this.props;
        const {currentPage, onNextPage, onPrevPage, onSubmit} = this.props;

        return(
            <div className="page-body">
                <main>
                    <div className="container">
                        <h5>Report A {capitalize(caseType)} Pet</h5>

                        {this.renderFields(currentPage)}
                    </div>
                </main>

                <footer className="page-footer">
                    <div className="btn-panel">
                        {this.renderButtons(currentPage)}
                    </div>
                </footer>
            </div>
        );
    }
}

export default UploadForm;