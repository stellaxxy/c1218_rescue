import React, {Component, Fragment} from 'react';
import FilterForm from './filterform';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import '../../assets/css/filter.scss';

class Filter extends Component {
    constructor(props) {
        super(props);
    }


    submit = values => {
        console.log('submit value:', this.props)
        console.log(values)
    }

    componentDidMount() {
        console.log('componenet didmount :', this.props)
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {});
    }

    render() {
        return (
            <Fragment>
                <div className="center">
                <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Filter</a>
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <FilterForm onSubmit={this.submit.bind(this)}/>
                    </div>
                </div>
                </div>

            </Fragment>


        );
    }
}

export default Filter

