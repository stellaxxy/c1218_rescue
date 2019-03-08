import React, { Component } from 'react';
import queryString from 'query-string';
import SearchPanel from './searchpanel';
import CaseList from '../cases';
import CaseMap from '../casemap';

class SearchPage extends Component {
    state = {  }
    render(props) {
        const params = queryString.parse(this.props.location.search);

        const filterValues = Object.assign({}, params);
        delete filterValues.mode;

        const displayPanel = params.mode === 'list' ? <CaseList/> : <CaseMap/>;

        return (
            <div>
                <h1>Welcome Search Page</h1>
                <SearchPanel filterValues={filterValues}/>

                {displayPanel}
            </div>
        );
    }
}

export default SearchPage;