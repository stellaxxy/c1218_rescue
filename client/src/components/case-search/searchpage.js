import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import SearchPanel from './searchpanel';
import CaseList from '../cases';
import CaseMap from '../casemap';

class SearchPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cases: []
        };
    }

    handleFilterClick = (filterValues) => {
        this.props.history.push('/searchform?' + queryString.stringify(filterValues));
    }

    handleFilterChange = (filterValues) => {
        this.props.history.push('/search?' + queryString.stringify(filterValues));
    }

    async getData() {
        try {
            let filterValues = queryString.parse(this.props.location.search);
            for (let key in filterValues) {
                if (!filterValues[key]) delete filterValues[key];
            }

            const qs = queryString.stringify(filterValues);
            const result = await axios.get('/api/caselist?' + qs);

            this.setState({
                cases: result.data.data || []
            })

        } catch(error) {
            this.setState({
                cases: []
            });
        }
    }

    async componentDidUpdate(prevProps){
        if(prevProps.location.search !== this.props.location.search){
            this.getData();
        }
    }

    async componentDidMount(){
        this.getData();
    }

    render(props) {
        const filterValues = queryString.parse(this.props.location.search);
        /*
        const displayPanel = filterValues.mode === 'map' ? 
            <CaseMap cases={this.state.cases}/> :
            <CaseList cases={this.state.cases}/>;

        return (
            <div className="bottomContainer">
                <SearchPanel filterValues={filterValues} onFilterClick={this.handleFilterClick} onFilterChange={this.handleFilterChange}/>

                {displayPanel}
            </div>
        );
        */
        //console.log('search page:', filterValues);
        if(filterValues.mode==='map'){
            return(
                <div className="bottomContainer map">
                    <CaseMap cases={this.state.cases} url={filterValues}/>
                    <SearchPanel filterValues={filterValues} onFilterClick={this.handleFilterClick} onFilterChange={this.handleFilterChange}/>
                </div>
            );
        } else {
            return(
                <div className="bottomContainer">
                    <SearchPanel filterValues={filterValues} onFilterClick={this.handleFilterClick} onFilterChange={this.handleFilterChange}/>
                    <CaseList cases={this.state.cases} filterValues={filterValues}/>
                </div>
            );
        }
    }
}

export default SearchPage;