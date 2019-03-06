import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './modal.scss';

class Modal extends Component {
/*
    state = {
        modal: null
    }

    componentDidMount(){
        const instances = M.Modal.init(this.refs.myCaseModal);
        this.setState({
            modal: instances
        });
    }

*/
    render(){
        //console.log(this.props);
        const {id, showModal, closeModal} = this.props;

        return (

                <div ref="myCaseModal" className={ showModal ? "modal open" : "modal" } id={id}>
                    <div className="modal-content">
                        <h5>Please provide your email and unique key</h5>
                        <div className="row">
                            <div className="input-field col s10">
                                <input placeholder='Email' id='email' type='email' className="validate"/>
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s10">
                                <input placeholder='Unique Key' id='key' type='text' className="validate"/>
                                <label htmlFor="key">Unique Key</label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Link to="#" onClick={closeModal} className="modal-action modal-close btn">Submit</Link>
                    </div>
                </div>

        );
    }
}

export default Modal;