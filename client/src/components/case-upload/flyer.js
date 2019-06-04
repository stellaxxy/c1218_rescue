import React, {Component, Fragment} from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import {LineShareButton, LineIcon, FacebookShareButton, FacebookIcon, GooglePlusShareButton, GooglePlusIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import './upload.scss';
import queryString from "query-string";
import {Link} from 'react-router-dom';
import MapContainer from './map';


class FlyerCode extends Component {

    state = {
        data: null,
        error: false,
        toggle: false
    };
    //-----------------------------------------------------------------------------------------
    // OPEN MAP
    //-----------------------------------------------------------------------------------------
    openModal = () => {
        let mapBody = document.getElementById('flyerMainContainer');
        mapBody.className = "mapBody";

        this.setState({
            toggle: true
        })
    };
    //-----------------------------------------------------------------------------------------
    // CLOSE MAP
    //-----------------------------------------------------------------------------------------
    closeModal = () => {
        let mapBody = document.getElementById('flyerMainContainer');
        mapBody.className = "";

        this.setState({
            toggle: false
        })
    };

    //-----------------------------------------------------------------------------------------
    // PRINT FLYER
    //-----------------------------------------------------------------------------------------   
    handlePrintClick = () => {
        window.print();
        return false;
    };

    //-----------------------------------------------------------------------------------------
    // SEND EMAIL
    //----------------------------------------------------------------------------------------- 
    async handleEmailSubmit(event) {
        try {
            event.preventDefault();

            let filterValues = {};
            if(this.props.location){
                filterValues = queryString.parse(this.props.location.search);
            }

            const caseid = this.props.id || filterValues.id;

            const response = await axios.post('/api/contactuser', {
                caseId: caseid,
                emailMessage: event.target.emailMessage.value
            })

            if (response.data.success) {
                M.toast({html: 'Thank you!  Your email has been sent'});
            } else {
                throw new Error('Email could not be sent');
            }

            this.setState({
                emailsent: true
            });
        } catch(error) {
            M.toast({html: "We're sorry.  The email could not be delivered at this time."});
        }
    }

    //-------------------------------------------------------------------------
    // RETRIEVE CASE DETAILS (INTO STATE)
    //-------------------------------------------------------------------------
    async componentDidMount() {
        try {
            let filterValues = {};
            if(this.props.location){
                filterValues = queryString.parse(this.props.location.search);
            }

            const caseid = this.props.id || filterValues.id;

            const response = await axios.post('/api/casedetails', {caseid});

            this.setState({
                data: response.data.data
            });
        } catch (error) {
            this.setState({error: true});
        }
    }

    //-------------------------------------------------------------------------
    // HANDLE GO BACK TO PREVIOUS HISTORY
    //-------------------------------------------------------------------------
    handleGoBack = () => {
        const filterValues = queryString.parse(this.props.location.search);

        delete filterValues.id;

        const searchUrlQuery = queryString.stringify((filterValues));

        this.props.history.push(`/search?${searchUrlQuery}`);
    }

    //-------------------------------------------------------------------------
    // RENDER
    //-------------------------------------------------------------------------
    render() {
        // Have to reset because Materialize modals set to HIDDEN
        document.body.style.overflow = "";

        const errorMessage = <h5>We're sorry.  An error has occurred.  Please try again.</h5>;

        try {
            const {data, error} = this.state;

            // HANDLE ERROR
            if (error) {

                return errorMessage;
            }

            // HANDLE STATE PRIOR TO DID MOUNT
            if (data === null) {
                return <div>Loading</div>
            }

            //----------------------------------------------------------------
            // GET VARIABLES FROM DATA
            //----------------------------------------------------------------
            const {phone} = data;
            const {location, city, state, zipcode} = data.location;
            const {animalType, description, size} = data.animalDetail;


            //----------------------------------------------------------------
            // CREATE DERIVED VARIABLES
            //----------------------------------------------------------------
            const url = `http://pawssolution.com/flyer?id=${data.id}`;
            const animalTypeDisplay = animalType === 'other' ? 'pet' : animalType;
            const caseTypeDisplay = data.caseType[0].toUpperCase() + data.caseType.slice(1);
            const socialMediaTitle = data.caseType === 'found' ?
                `Please help me identify found ${animalType}` :
                `Please help find my ${animalType}`;

            return (
                <Fragment>
                    <div id="flyerMainContainer">
                        <div id="flyer">
                            <div className="flyerDiv">
                                <div className="buttons center socialMediaBtn">
                                    <FacebookShareButton url={url} quote={socialMediaTitle}>
                                        <FacebookIcon size={40} round />
                                    </FacebookShareButton>
                                    <LineShareButton url={url}>
                                        <LineIcon size={40} round />
                                    </LineShareButton>
                                    <TwitterShareButton url={url} title={socialMediaTitle}>
                                        <TwitterIcon size={40} round />
                                    </TwitterShareButton>
                                    <button onClick={this.handlePrintClick} className="btn-floating"><i className="material-icons">print</i></button>
                                </div>
                                <div className="row">
                                    <div className="col s10 offset-s1 center title">
                                        <h2>{caseTypeDisplay.toUpperCase()} {animalTypeDisplay.toUpperCase()}</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s10 offset-s1 m8 offset-m2 l12 center image-container">
                                        <img src={data.coverImg} className="responsive-img"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12 bottom">
                                        <div className="details">
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td><i className="material-icons">phone</i></td>
                                                    <td className="centerCol"><a href={'tel:+1' + phone}>{phone.slice(0, 3)}-{phone.slice(3, 6)}-{phone.slice(6)}</a></td>
                                                    <td> </td>
                                                </tr>
                                                <tr>
                                                    <td><i className="material-icons">location_on</i></td>
                                                    <td className="centerCol">{city} {state} {zipcode}</td>
                                                    <td className="centerCol"><a className="waves-effect waves-light modal-trigger" onClick={this.openModal}>See On Map</a></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="qrcode">
                                            <QRCode
                                                value={url}
                                                size={128}
                                                fgColor='#000000'
                                                bgColor='#ffffff'
                                                level='L'
                                                renderAs='svg'
                                                includeMargin={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        <span className="label">DESCRIPTION:</span> <span className="description">{caseTypeDisplay} on {data.date}. Size: {size}.  Last seen near {location}. {description}</span>
                                    </div>
                                </div>
                            </div>
                            {this.props.id ? <div>{''}</div> :
                                <Fragment>
                                    <div className="row footer">
                                        <div className="col s12 center">
                                            Generated by PAWSFindHome.com
                                        </div>
                                    </div>

                                    <div className="row center emailDiv">
                                        <form onSubmit={this.handleEmailSubmit.bind(this)}>
                                            <div className="input-field col s12">
                                                <textarea className="materialize-textarea" id="emailMessage"/>
                                                <label htmlFor="emailMessage">Please enter your message to send an email to poster.</label>
                                            </div>
                                            <div className="flyerBtnDiv">
                                                <button type="btn" onClick={this.handleGoBack} className="btn-floating waves-light waves-effect btn leftBtn">Back</button>
                                                <button type="submit" className="btn-floating waves-light waves-effect btn rightBtn"><i className="material-icons">email</i></button>
                                            </div>
                                        </form>
                                    </div>
                                </Fragment>}
                        </div>
                    </div>

                    <div className={this.state.toggle? "mapModalOpen mapModal" : "mapModalClose mapModal"} id="mapModal">
                        <div className="modal-content">
                            <MapContainer data={data} url={this.props.id? `?id=${this.props.id}` : this.props.location.search}/>
                        </div>
                        <div className="modal-footer">
                            <button className="modalCloseBtn" onClick={this.closeModal}>Close</button>
                        </div>
                    </div>
                </Fragment>
            )
        } catch (error) {
            this.setState({
                error: error
            })
            return errorMessage;
        }
    }
}

export default FlyerCode;