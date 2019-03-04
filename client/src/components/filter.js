import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom'
import '../assets/css/filter.scss';


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

            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems, {});
    }
    render() {
        return (
            <Fragment>

                    <a className="waves-effect waves-light btn modal-trigger right" href="#modal1">Filter</a>
                    <div id="modal1" className="modal">
                        <div className="modal-content">
                            <input placeholder="Zip code" id="zip_code" type="text" className="validate"/>
                            <input placeholder="City to search" id="city" type="text" className="validate"/>
                            <input placeholder="Animal type" id="animalType" type="text" className="validate"/>
                            <input placeholder="Animal gender" id="gender" type="text" className="validate"/>
                            <input placeholder="Animal size" id="size" type="text" className="validate"/>
                            <input placeholder="Main color" id="color" type="text" className="validate"/>

                        </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Apply</a>
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Clear</a>
                    </div>
                    </div>

            </Fragment>




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