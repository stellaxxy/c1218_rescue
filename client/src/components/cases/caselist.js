import React, {Component} from 'react';
import axios from 'axios';
import exampleImage from '../../assets/images/cover1.jpg';
import CaseItem from './caseitem';
import './caselist.scss';
import FilterPanel from '../case-filter';
import connect from "react-redux/es/connect/connect";


class CaseList extends Component {
    state = {
        error: false,
        cases: [],
        filters: []
    };

    clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName];
            }
        }
        return Object.keys(obj).length==0 ? null : obj
    }


    async renderPage(params) {

        try {
            let filterValues = Object.assign({}, this.props.filterValues);

            filterValues = this.clean(filterValues)

            let filters = this.state.filters
            if (params && params.remove) {
                var keys = Object.keys(params.remove)
               keys.forEach((key) => {
                    delete filterValues[key]
                    delete filters[key]
               })
            }
            console.log('clean:', filterValues);
            console.log('params', params);
            console.log('props' , this.props);

            const {caseType, animalType, size, zipcode, city} = filterValues || params || this.props;
            const queryStringArray = [{caseType}, {animalType}, {size}, {zipcode}, {city}];

            let endpointString = '/api/caselist?';

            queryStringArray.map(item => {
                if (Object.values(item)[0]) {
                    if (endpointString[endpointString.length - 1] !== '?') {
                        endpointString = endpointString + '&';
                    }
                    endpointString = endpointString + Object.keys(item)[0] + '=' + Object.values(item)[0];
                    filters.push(Object.keys(item)[0])
                }
            });

            const result = await axios.get(endpointString);

            if (result.data.success === false) {
                throw new Error('Failed to retrieve data');
            }

            if (result.data.data.length === 0) {
                throw new Error('No data available');
            }

            this.setState({
                cases: result.data.data,
                filters: filters,
                error:false
            })

            console.log('filter value',filters.filters);

        } catch (error) {
            this.setState({
                error: true,
                cases: [],


            });
        }

    }

    componentDidMount() {
        this.renderPage();
    }

    componentDidUpdate(prevState) {
        if (prevState.caseType !== this.props.caseType || prevState.size !== this.props.size || prevState.animalType !== this.props.animalType || prevState.city !== this.props.city || prevState.zipcode !== this.props.zipcode) {
            this.setState({
                error: false
            });
            this.renderPage(null);
        }

    }

    applyFilter(params) {
        this.renderPage(params);

    }

    render() {

        if (this.state.error === true) {
            return (
                <div>
                    <div>
                        <FilterPanel applyFilter={this.applyFilter.bind(this)}/>
                        <div className="caseListContainer">
                            <div>No Matching Data</div>
                        </div>
                    </div>
                </div>

            );
        }
        if (this.state.cases.length === 0) {
            return (
                <div>Loading</div>
            );
        }

        const caseItemArray = this.state.cases.map(item => {
            return <CaseItem key={item.id} coverImg={exampleImage} {...item} />
        });

        return (
            <div>
                <FilterPanel applyFilter={this.applyFilter.bind(this)}/>
                <div className="caseListContainer">
                    {caseItemArray}
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        filterValues: state.caseFilters.values
    }
}

export default connect(mapStateToProps)(CaseList);


