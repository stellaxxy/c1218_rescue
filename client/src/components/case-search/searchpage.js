import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import SearchPanel from './searchpanel';
import CaseList from '../cases';
import CaseMap from '../casemap';
import './searchpage.scss'

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
                    <form className="listForm">
                        <h5>Case Type:</h5>
                        <div className="radioFound">
                            <label htmlFor="found">Found</label>
                            <input className="radioBtn" type="radio" name="caseType" value="found"/>
                        </div>
                        <div className="radioLost">
                            <label htmlFor="lost">Lost</label>
                            <input className="radioBtn" type="radio" name="caseType" value="lost"/>
                        </div>
                        <div className="locationDiv">
                            <h5>Location</h5>
                            <h6>City, Zip Code or Address</h6>
                            <input type="text" placeholder="Irvine"/>
                        </div>
                        <div className="animalDiv">
                            <h5>Animal</h5>
                            <h6>Type</h6>
                            <select className="selectOpt" name="animalType">
                                <option value="dog">Dog</option>
                                <option value="cat">Cat</option>
                                <option value="others">Others</option>
                            </select>
                            <h6>Size</h6>
                            <select className="selectOpt" name="animalSize">
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>
                    </form>

                    <CaseList cases={this.state.cases} filterValues={filterValues}/>
                </div>
            );
        }
        //<SearchPanel filterValues={filterValues} onFilterClick={this.handleFilterClick} onFilterChange={this.handleFilterChange}/>
    }
}

export default SearchPage;