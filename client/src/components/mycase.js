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
        updating: false
    };

    closeModal = () => {
        this.setState({
            modal: false
        })
    };

    async componentDidMount(){
        try{
            if(this.props.match.params.caseid){

                const result = await axios.get('/api/casedetails?id=' + this.props.match.params.caseid);

                let data = result.data.data;
                data.coverImg = new MockFile(data.coverImg);

                if(result.data.success){
                    this.setState({
                        data: data,
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

    handleSubmit = async formValues => {
        try {
            const result = await axios.get('/api/casedetails?caseKey=' + formValues.caseKey + '&email=' + formValues.email);

            if(result.data.success){
                this.setState({
                    data: result.data.data
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

    handleUpdateBtn = () => {
        //this.handleOnDrop([{lastModified: '1551340347922',lastModifiedDate: new Date().toGMTString(), name: 'https://pet-rescue-images1.s3.us-west-2.amazonaws.com/1554494804184', preview: "https://pet-rescue-images1.s3.us-west-2.amazonaws.com/1554494804184", size: '13552 bytes', type: "image/jpeg", webkitRelativePath: ""}]);
        this.setState({
            update: true,
        });
    };


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

    closeCase = async () => {
        try {
            const {id} = this.state.data;
            const response = await axios.post('/api/updatestatus', {id: id, status: 'closed'});

            if(!response.data.success){
                throw new Error('axios call error');
            }
        } catch(error) {
            this.setState({
                error: true,
                modal: false
            });
        }
    };

    handleOnDrop = newImageFile => this.setState({ imageFile: newImageFile });

    handleReturn = () => {
      this.setState({
          update: false
      })
    };

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

        let initialValues = {};
        //console.log('mycase update data:', this.state.data);
        if(this.state.data){
            initialValues = {...this.state.data};

            initialValues.animalType = initialValues.animalDetail.animalType;
            initialValues.animalSize = initialValues.animalDetail.size;
            initialValues.street = initialValues.location.location;
            initialValues.city = initialValues.location.city;
            initialValues.name = initialValues.userName;
            initialValues.caseDate = initialValues.date;
            initialValues.description = initialValues.animalDetail.description;

            delete initialValues.animalDetail;
            delete initialValues.location;
            delete initialValues.userName;
            delete initialValues.date;
        }

        return (

            <div className="myCaseContainer">
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
                                            <Link to="/closecase" className="waves-effect waves-light btn btn-action myCaseCloseBtn" onClick={this.closeCase}>CLOSE CASE</Link>
                                            <button className="waves-effect waves-light btn btn-action myCaseCloseBtn"  onClick={this.handleUpdateBtn}>UPDATE CASE</button>
                                        </Fragment>)
                                        :
                                        null
                                }
                            </div>

                            <Modal onSubmit={this.handleSubmit} showModal={this.state.modal} heading="Please provide your email and unique key"/>
                        </Fragment>
                }
            </div>

        );
    }
}

export default MyCase;
