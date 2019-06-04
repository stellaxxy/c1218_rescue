import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from './general/modal/modal';
import axios from 'axios';
import {Fragment} from 'react';
import '../assets/css/mycase.scss';
import FlyerCode from './case-upload/flyer';
import UpdateForm from './case-upload/upload_form';

class MockFile {
    constructor(source) {
        this.name = source;
        this.preview = source;
        this.size = '1000';
    }
}

class MyCase extends Component {
    state = {
        modal: true,
        data: null,
        error: false,
        update: false,
        imageFile: [],
        matchingData: true,
        updating: false,
        toggle: false
    };
    //-----------------------------------------------------------------------------------------
    // CLOSE LOGIN MODAL
    //-----------------------------------------------------------------------------------------
    closeModal = () => {
        this.setState({
            modal: false
        })
    };
    //-----------------------------------------------------------------------------------------
    // TRANSFORM DATA OBJECT
    //-----------------------------------------------------------------------------------------
    transformData(data) {
        data.animalType = data.animalDetail.animalType;
        data.animalSize = data.animalDetail.size;
        data.street = data.location.location;
        data.city = data.location.city;
        data.name = data.userName;
        data.caseDate = data.date;
        data.description = data.animalDetail.description;

        data.coverImg = new MockFile(data.coverImg);

        delete data.animalDetail;
        delete data.location;
        delete data.userName;
        delete data.date;

        return data;
    }

    async componentDidMount(){
        try{
            if(this.props.match.params.caseid){

                const result = await axios.post('/api/casedetails', {caseid: this.props.match.params.caseid});

                let data = result.data.data;

                if(result.data.success){
                    this.setState({
                        data: this.transformData(data),
                        imageFile: [data.coverImg],
                        update: false,
                        modal: false
                    });
                } else {
                    throw new Error('axios call error');
                }

            }
        } catch(error) {
            this.setState({
                error: true,
                modal: false
            })
        }

    }

    componentDidUpdate(prevProps){
        if(prevProps.location.pathname !== this.props.location.pathname){
            if(this.props.location.pathname === '/mycase'){
                this.setState({
                    modal: true,
                    data: null,
                    update: false,
                    error: false,
                    updating: false
                })
            }
        }
    }
    //-----------------------------------------------------------------------------------------
    // RENDER SPINNER ON LOADING
    //-----------------------------------------------------------------------------------------
    renderSpinner() {
        const {updating} = this.state;

        return (
            <div className="preloaderHolder">
                <div className={"preloader-wrapper big " + (updating ? 'active' : '')}>
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
            </div>
        )
    }
    //-----------------------------------------------------------------------------------------
    // HANDLE LOGIN MODAL CONFIRM
    //-----------------------------------------------------------------------------------------
    handleSubmit = async formValues => {
        try {
            const result = await axios.post('/api/casedetails', {caseKey: formValues.caseKey, email:formValues.email});

            if(result.data.success){
                const data = this.transformData(result.data.data);
                await this.setState({
                    data: data,
                    imageFile: [data.coverImg]
                });
                this.closeModal();
                this.props.history.push(`/mycase/${this.state.data.id}`);
            } else {
                if(result.data.errorMessage === 'There is no matching case.'){
                    this.setState({
                        matchingData: false
                    });
                } else {
                    throw new Error('axios call error');
                }
            }
        } catch(error) {
            this.setState({
                error: true,
                modal: false
            });
        }

    };
    //-----------------------------------------------------------------------------------------
    // HANDLE UPDATE BUTTON CLICK
    //-----------------------------------------------------------------------------------------
    handleUpdateBtn = () => {
        this.setState({
            update: true,
        });
    };

    //-----------------------------------------------------------------------------------------
    // HANDLE UPDATE
    //-----------------------------------------------------------------------------------------
    handleUpdate = async (formValues) => {
        try {
            event.preventDefault();

            this.setState({updating: true});

            let data = new FormData();
            for (let [key, value] of Object.entries(formValues)) {

                if (key === 'coverImg') {
                    // CURRENTLY ONLY SEND 1 IMAGE
                    value = value[0] ? value[0] : null;
                }
                if(value === null){
                    value = '';
                }

                data.append(key, value);
            }

            const response = await axios({
                method: 'post',
                url: '/api/updatecase',
                data: data,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            });

            if(response.data.success === true){
                setTimeout(()=>{
                    this.setState({
                        update: false
                    });
                    this.props.history.push(`/updatesuccessful/${this.state.data.id}`);
                }, 1800);

            } else {
                throw new Error('axios call error');
            }

        } catch(error) {
            this.setState({
                error: true,
                modal: false
            });
        }
    };
    //-----------------------------------------------------------------------------------------
    // HANDLE CLOSE CASE
    //-----------------------------------------------------------------------------------------
    closeCase = async () => {
        try {
            const {id} = this.state.data;
            const response = await axios.post('/api/updatestatus', {id: id, status: 'closed'});

            if(!response.data.success){
                throw new Error('axios call error');
            } else {
                this.props.history.push('/closecase');
            }
        } catch(error) {
            this.setState({
                error: true,
                modal: false
            });
        }
    };
    //-----------------------------------------------------------------------------------------
    // HANDLE CLOSE CONFIRMATION
    //-----------------------------------------------------------------------------------------
    handleConfirmation = ()=>{
        this.setState({
            toggle: true
        })
    };
    //-----------------------------------------------------------------------------------------
    // HANDLE CLOSE CONFIRMATION MODAL
    //-----------------------------------------------------------------------------------------
    handleCloseModal = ()=>{
      this.setState({
          toggle: false
      });
    };
    //-----------------------------------------------------------------------------------------
    // HANDLE DROP IMAGE
    //-----------------------------------------------------------------------------------------
    handleOnDrop = newImageFile => this.setState({ imageFile: newImageFile });
    //-----------------------------------------------------------------------------------------
    // HANDLE RETURN FROM UPDATE TO MY CASE
    //-----------------------------------------------------------------------------------------
    handleReturn = () => {
      this.setState({
          update: false
      })
    };
    //-----------------------------------------------------------------------------------------
    // RENDER
    //-----------------------------------------------------------------------------------------
    render() {
        if (this.state.error === true) {
            return (
                <Fragment>
                    <Modal onSubmit={this.handleSubmit} showModal={this.state.modal} heading="Please provide your email and unique key" info={[]}/>
                    <div className="mycaseError">
                        <h4>Sorry an error has occurred. Please try again later.</h4>
                    </div>
                </Fragment>
            );
        }

        if (!this.state.matchingData) {
            return (
                <Fragment>
                    <Modal onSubmit={this.handleSubmit} showModal={this.state.modal} heading="Please provide your email and unique key" info={[]}/>
                    <div className="mycaseError">
                        <h4>Invalid email or caseKey.</h4>
                    </div>
                </Fragment>
            );
        }

        if (this.state.data === null) {
            return (
                <Fragment>
                    <Modal onSubmit={this.handleSubmit} showModal={this.state.modal} heading="Please provide your email and unique key"/>
                </Fragment>

            );
        }

        let initialValues = this.state.data ? {...this.state.data} : {};

        return (
            <Fragment>
                <div className={this.state.toggle ? "myCaseContainer confirmModalBackground":"myCaseContainer"}>
                    {
                        this.state.update ?
                            <Fragment>
                                <UpdateForm id={initialValues.id} initialValues={initialValues} onReturn={this.handleReturn} onDrop={this.handleOnDrop} showUpdate={this.state.update} onSubmit={this.handleUpdate} isUpdate={true} imageFile={this.state.imageFile}/>
                                {this.renderSpinner()}
                            </Fragment>
                            :
                            <Fragment>
                                <FlyerCode id={this.state.data.id}/>
                                <div className="myCaseCloseBtnContainer">
                                    {
                                        this.state.data.status === 'active' ?

                                            (<Fragment>
                                                <button className="waves-effect waves-light btn btn-action myCaseCloseBtn" onClick={this.handleConfirmation}>CLOSE CASE</button>
                                                <button className="waves-effect waves-light btn btn-action myCaseCloseBtn"  onClick={this.handleUpdateBtn}>UPDATE CASE</button>
                                            </Fragment>)
                                            :
                                            <div className="caseIsClosedDiv">This Case Is Closed</div>
                                    }
                                </div>

                                <div className="row footer">
                                    <div className="col s12 center">
                                        Generated by PAWSFindHome.com
                                    </div>
                                </div>
                                <Modal onSubmit={this.handleSubmit} showModal={this.state.modal} heading="Please provide your email and unique key"/>
                            </Fragment>
                    }
                </div>

                <div className={this.state.toggle? "confirmModal openConfirmModal":"confirmModal closeConfirmModal"}>
                    <div className="confirmModalContent">
                        <p>Are You Sure You Want To Close This Case?</p>
                        <div>
                            <button onClick={this.closeCase}>Yes</button>
                            <button onClick={this.handleCloseModal}>No</button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MyCase;
