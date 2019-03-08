import React, {Component} from 'react';
import './filterform.scss';

class FilterPanel extends Component {

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
            </div>

        )
    }
}

export default FilterPanel;

