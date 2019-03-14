import React, {Component, Fragment} from 'react';
import '../assets/css/casedetails.scss';
import axios from 'axios';
import '../assets/css/contactpage.scss';
import {Link} from 'react-router-dom';
import EmailConfirmation from "./emailconfirmation";
import queryString from "query-string";


class Contact extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            value: '',
            emailsent: false,
            call: false

        }

    }

    async componentDidMount() {



        const queryObj = queryString.parse(this.props.location.search);
        console.log('contact page queryObj:',queryObj);
        console.log('this.props.data:', this.props.data)

        const {id}= queryObj;
        let response= await axios.get('/api/userdetails?caseid='+id)

        console.log('contact page response',response)
        this.setState({
            call: true,
            phone: response.data.data.phone
        })


    }




    async handelSubmit(event) {
        const {caseid} = this.props.match.params;
        console.log('this.props.match:', this.props.match.params);
        await axios.post('/api/contactuser', {
            caseId: caseid,
            emailMessage: this.state.value
        })

        this.setState({
            emailsent: true
        });
    }


    handelChange(event) {

        this.setState({value: event.target.value});

    }

    render() {
        console.log('contact url:', this.props.location.search)


        if (this.state.emailsent) {
            return (
                <EmailConfirmation/>
            )
        }

        const goBackUrl = queryString.stringify(this.state.query);
        console.log('case details gobackurl', goBackUrl);

        return (
            <Fragment>
                <div className="container contact-page center">
                    <h5>Contact</h5>
                    <main>

                        <form onSubmit={this.handelSubmit}>
                            <div className="row">
                                <div className="input-field col s12">

                                <textarea className="materialize-textarea" id="text" value={this.state.value}
                                          onChange={this.handelChange.bind(this)}/>

                                    <label htmlFor="text">Please enter your message</label>
                                </div>
                            </div>
                            <div>
                                <a href={`tel:${this.state.phone}`}                        // {"tel:{phone}"}
                                   className="btn-floating btn-large waves-effect waves-light pulse green center"><i
                                    className="material-icons center">phone</i></a>
                            </div>
                        </form>
                    </main>
                </div>

                <footer>
                    <div className="btn-panel">

                        <Link to={"/casedetails" +this.props.location.search}
                              className="waves-effect waves-light btn orange text-white deep-orange accent-4">Back</Link>
                        <button className="waves-effect waves-light btn orange text-white deep-orange accent-4"
                                float="right" onClick={this.handelSubmit.bind(this)}>Send<i className="material-icons center">email</i>
                        </button>
                    </div>
                </footer>
            </Fragment>

        )
    }

}

export default Contact;