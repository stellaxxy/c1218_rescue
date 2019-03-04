import React, {Component} from 'react';
import ReactDOM from 'react-dom'


class Filter extends Component {

    // state={
    //     //     show:false
    //     // }
    //     //
    //     // showModal=()=>{
    //     //     this.setState({
    //     //         show:true
    //     //     })
    //     // }
    //     //
    //     // hideModal=()=>{
    //     //     this.setState({
    //     //         show:false
    //     //     })
    //     // }


    componentDidMount(){
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems, options);

    });
    }
    render() {
        return (
            <div>
                <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4>Modal Header</h4>
                        <p>A bunch of text</p>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Search</a>
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancel</a>
                    </div>
                </div>
                </main>

            </div>


        );
    }
}

export default Filter


/*

    <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4>Modal Header</h4>
                        <p>A bunch of text</p>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Search</a>
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancel</a>
                    </div>
                </div>
                */