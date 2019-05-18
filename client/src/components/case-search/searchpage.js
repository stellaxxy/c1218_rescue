import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import SearchPanel from './searchpanel';
import CaseList from '../cases';
import CaseMap from '../casemap';
import './searchpage.scss'
import Filter from './filterform';
import pawsPrint from '../../assets/images/print.png';
import pawsPrintRight from '../../assets/images/print.png';

class SearchPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cases: [],
            mapAllCases: [],
            error: false
        };
    }

    handleFilterChange = (filterValues) => {
        this.props.history.push('/search?' + queryString.stringify(filterValues));
    };

    async getData() {
        try {
            let filterValues = queryString.parse(this.props.location.search);

            for (let key in filterValues) {
                if (!filterValues[key]) delete filterValues[key];
            }

            const qs = queryString.stringify(filterValues);

            const result = await axios.get('/api/caselist?' + qs);

            if(result.data.success){
                this.setState({
                    cases: result.data.data || []
                })
            } else {
                this.setState({
                   error: true
                });
            }

        } catch(error) {
            this.setState({
                cases: [],
                error: true
            });
        }
    }

    async getAllData() {
        try {
            const result = await axios.get('/api/caselist');

            if(result.data.success){
                this.setState({
                    mapAllCases: result.data.data
                })
            } else {
                this.setState({
                    error: true
                });
            }
        } catch(error){
            this.setState({
                error: true
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
        this.getAllData();
    }

    handleFilterFormSubmit = formValues=>{
        event.preventDefault();
        this.handleFilterChange(formValues);
    };

    render() {
        const filterValues = queryString.parse(this.props.location.search);

        if(filterValues.mode==='map'){
            return(
                <div className="bottomContainer map">
                    <CaseMap searchUrl={this.props.location.search} error={this.state.error} cases={this.state.cases} url={filterValues} allCases={this.state.mapAllCases}/>
                    <SearchPanel filterValues={filterValues} onFilterChange={this.handleFilterChange}/>
                </div>
            );
        } else {
            return(
                <div className="bottomContainer">
                    <h4 className="searchListTitle">PET SEARCH</h4>
                    <h6 className="searchListTitle">SELECT SEARCH CRITERIA AND CLICK SEARCH</h6>
                    <div className="leftDiv">
                        <img src={pawsPrint} className="pawsPrintLeft"/>
                    </div>
                    <div className="centerDiv">
                        <Filter onFilterChange={this.handleFilterChange} initialValues={filterValues} onSubmit={this.handleFilterFormSubmit}/>
                        <CaseList searchUrl={this.props.location.search} error={this.state.error} cases={this.state.cases} filterValues={filterValues}/>
                    </div>
                    <div className="rightDiv">
                        <img src={pawsPrintRight} className="pawsPrintRight"/>
                    </div>
                </div>
            );
        }
    }
}

export default SearchPage;