import React, {Component, Fragment} from 'react';
import queryString from 'query-string';
import './filterform.scss';

class SearchPanel extends Component {

    handleFilterClick = () => {
        const inputValue = document.getElementById('mapInput').value;
        this.props.filterValues.zipcode = inputValue;
        this.props.onFilterChange(this.props.filterValues);
    };

    render() {
        return (
            <div className="filter-panel">
                <input className="mapSearchInput col s6 offset-s1" type="text" placeholder="Zip Code" id="mapInput" defaultValue={this.props.filterValues.zipcode || ""}/>
                <button type="button" className="waves-effect waves-green btn" onClick={this.handleFilterClick}>Filter</button>
            </div>

        )
    }
}

export default SearchPanel;