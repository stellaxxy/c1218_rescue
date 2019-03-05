import React, {Component, Fragment} from 'react';
import FilterForm from './filterform';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import '../assets/css/filter.scss';
import history from './history';


class Filter extends Component {
    constructor(props){
        super(props);
    }


    submit = values => {
        console.log('submit value:',this.props)
        history.push("/caselist");
        console.log(values)
    }

    componentDidMount(){
        console.log('componenet didmount :',this.props)
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems, {});
    }
    render() {
        return (
            <Fragment>

                    <a className="waves-effect waves-light btn modal-trigger right" href="#modal1">Filter</a>
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <FilterForm onSubmit={this.submit.bind(this)}/>
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