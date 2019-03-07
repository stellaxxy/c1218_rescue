import React, {Component} from 'react';
import './filterform.scss';
import {connect} from 'react-redux';
import Filter from './filtermodal';

class FilterPanel extends Component {

    handleChipClose(key,value){
        var removefilter={}
        removefilter[key]=value;
        this.props.applyFilter({
            remove: removefilter
        })


       //this.props.change('casefilter',key,'')

    }

    renderChips() {


        let chips = null;

        const values = this.props.filterValues;

        if (!values) return chips;

        chips = Object.keys(values).map((key, i) => {
            let value = values[key]
            if(!value){
                return null;
            }
            return (
                <div key={i} className="chip">
                    {value}
                    <i onClick = {()=>this.handleChipClose(key,value)} className="close material-icons">close</i>
                </div>
            )

        })
        return chips;
    }

    render() {

        return (
            <div className="filter-panel">
                <div className="chip-panel">
                    {this.renderChips()}
                </div>
                <Filter applyFilter={this.props.applyFilter}/>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        filterValues: state.caseFilters.values
    }
}



export default connect(mapStateToProps)(FilterPanel);

