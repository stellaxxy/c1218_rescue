import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from './general/modal/modal';
import axios from 'axios';
import {Fragment} from 'react';
import '../assets/css/mycase.scss';
import FlyerCode from './case-upload/flyer';
import UpdateForm from './case-upload/upload_form';
//import Update from './update-modal/update_form'

class MyCase extends Component {
    state = {
        modal: true,
        data: null,
        error: false,
        update: false,
        imageFile: []
    };

    closeModal = () => {
        this.setState({
            modal: false
        })
    };

    async componentDidMount(){
        if(this.props.match.params.caseid){
            //console.log('my case id', this.props.match.params.caseid);
            const result = await axios.get('/api/casedetails?id=' + this.props.match.params.caseid);
            //console.log('mycase result:', result);
            this.setState({
                data: result.data.data,
                update: false,
                modal: false
            });
        }
    }

    componentDidUpdate(prevProps){
        //console.log('preprops:', prevProps);
        //console.log('props:', this.props);
        if(prevProps.location.pathname !== this.props.location.pathname){
            if(this.props.location.pathname === '/mycase'){
                this.setState({
                    modal: true,
                    data: null,
                    update: false
                })
            }
        }
    }

    handleSubmit = async formValues => {

        const result = await axios.get('/api/casedetails?caseKey=' + formValues.caseKey + '&email=' + formValues.email);

        if (result.data.success === true) {
            this.setState({
                data: result.data.data
            });
            this.closeModal();
            this.props.history.push(`/mycase/${this.state.data.id}`);
        } else {
            this.setState({
                error: true
            });
        }
    };

    handleUpdateBtn = () => {

        this.setState({
            update: true
        });

    };


    handleUpdate = async (formValues) => {
        event.preventDefault();

        //console.log('imagefile:', this.state.imageFile);

        for (let [key, value] of Object.entries(formValues)) {

            if (key === 'coverImg') {
                // CURRENTLY ONLY SEND 1 IMAGE
                formValues.coverImg = value[0];
            }
        }
        console.log('DATA:', formValues);
        const postData = {id: this.state.data.id, ...formValues};
        console.log('postData', postData);
        const updateResult = await axios.post('/api/updatecase', postData);
        console.log('update result', updateResult);
        if(updateResult.data.success === true){
            const result = await axios.get('/api/casedetails?id=' + this.state.data.id);

            setTimeout(()=>{
                this.setState({
                    data: result.data.data,
                    update: false
                });
                this.props.history.push(`/updatesuccessful/${this.state.data.id}`);
            }, 1800);

        }
    };

    closeCase = async () => {
        const {id} = this.state.data;
        const response = await axios.post('/api/updatestatus', {id: id, status: 'closed'});
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
                    <div>No Matching Case</div>
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

        return (

            <div className="myCaseContainer">
                {
                    this.state.update ?
                        (<UpdateForm onReturn={this.handleReturn} onDrop={this.handleOnDrop} showUpdate={this.state.update} onSubmit={this.handleUpdate} isUpdate={true} imageFile={this.state.imageFile}/>)
                        :
                        (<Fragment>
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
                        </Fragment>)
                }

            </div>
        );
    }
}

export default MyCase;
