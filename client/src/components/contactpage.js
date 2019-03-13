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

    async componenetDidMount() {
        const {caseid, phoneNo} = this.props.data
        console.log('this.props.data:', this.props.data)
        await axios.get('/api/userdetails', {
            caseId: caseid,
            phone: phoneNo
        })
        this.setState({
            call: true
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
                                <a href={"tel:{phone}"}
                                   className="btn-floating btn-large waves-effect waves-light red center"><i
                                    className="material-icons center">phone</i></a>
                            </div>
                        </form>
                    </main>
                </div>

                <footer>
                    <div className="btn-panel">

                        <Link to={"/casedetails/" + this.props.match.params.caseid}
                              className="waves-effect waves-light btn orange text-white deep-orange accent-4">Back</Link>
                        <button className="waves-effect waves-light btn orange text-white deep-orange accent-4"
                                float="right" onClick={this.handelSubmit.bind(this)}>Send
                        </button>
                    </div>
                </footer>
            </Fragment>

        )
    }

}

export default Contact;