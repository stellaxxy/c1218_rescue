import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from './general/modal/modal';

class MyCase extends Component {
    state = {
        modal: true
    };

    // componentDidMount(){
    //     const instances = M.Modal.init(this.refs.myCaseModal);
    //     this.setState({
    //         modal: instances
    //     });
    // }

    closeModal = () =>{
        this.setState({
            modal: false
        })
    };

    render(){
        return (
            <Modal showModal={this.state.modal} closeModal={this.closeModal}/>

        );
    }
}

export default MyCase;

/*
<div ref="myCaseModal" className='modal' id='myCaseModal'>
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
                        <Link onClick={this.closeModal} to="#" className="modal-close btn">Submit</Link>
                    </div>
                </div>
 */