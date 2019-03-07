import React, {Component, Fragment} from 'react';
import FilterForm from './filterform';
import {connect} from 'react-redux';
import { setCaseFilterValues } from '../../actions';
import '../../assets/css/filter.scss';

class Filter extends Component {
    constructor(props) {
        super(props);
    }


    submit = event => {
        event.preventDefault();

        const values = {};
        const params = ['caseType', 'animalType', 'size', 'city', 'zipcode'];

        params.forEach(param => values[param] = event.target[param].value);
        this.props.setCaseFilterValues(values);

        this.props.applyFilter(values);
    }


    // reset = values=>{
    //     this.props.applyFilter.reset()
    // }

    componentDidMount() {
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

export default connect(null, {setCaseFilterValues})(Filter)

