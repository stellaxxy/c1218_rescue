import React, {Component, Fragment} from 'react';
import queryString from 'query-string';
import './filterform.scss';

class SearchPanel extends Component {

    handleFilterClick = () => {
        this.props.onFilterClick(this.props.filterValues);
    }

    handleChipClose(key) {
        const newFilters = {...this.props.filterValues};
        newFilters[key] = '';
        this.props.onFilterChange(newFilters);
    }

    renderChips() {

        const defaultValues = {
            zipcode: '',
            animalType: '',
            city: '',
            caseType: '',
            animalSize: ''
        }
        const values = this.props.filterValues || defaultValues;

        const hide = {
            display: 'none'
        }

        const show = {
            display: 'inline-block'
        }

        return (
            <Fragment>
                <div className="chip" style={values.caseType ? show : hide}>
                    {values.caseType}
                    <i onClick = {()=>this.handleChipClose('caseType')} className="close material-icons">close</i>
                </div>
                <div className="chip" style={values.animalType ? show : hide}>
                    {values.animalType}
                    <i onClick = {()=>this.handleChipClose('animalType')} className="close material-icons">close</i>
                </div>
                <div className="chip" style={values.animalSize ? show : hide}>
                    {values.animalSize}
                    <i onClick = {()=>this.handleChipClose('animalSize')} className="close material-icons">close</i>
                </div>
                <div className="chip" style={values.city ? show : hide}>
                    {values.city}
                    <i onClick = {()=>this.handleChipClose('city')} className="close material-icons">close</i>
                </div>
                <div className="chip" style={values.zipcode ? show : hide}>
                    {values.zipcode}
                    <i onClick = {()=>this.handleChipClose('zipcode')} className="close material-icons">close</i>
                </div>
            </Fragment>
        )
    }

    render() {

        return (
            <div className="filter-panel">
                <div className="chip-panel">
                    {this.renderChips()}
                </div>
                <button type="button" className="waves-effect waves-green btn" onClick={this.handleFilterClick}>Filter</button>
            </div>

        )
    }
}

export default SearchPanel;

