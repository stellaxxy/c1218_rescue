import React, {Component} from 'react';
import './filterform.scss';
import {connect} from 'react-redux';
import Filter from './filtermodal';
import {change} from 'redux-form';



class FilterPanel extends Component {

    handleChipClose(key,value){


        console.log('this.props.change:',this.props.change)


    }

    renderChips() {


        let chips = null;
        if (!this.props.casefilter) {
            return chips;
        }
        const {values} = this.props.casefilter;
        if (!values) {
            return chips;
        }
        chips = Object.keys(values).map((key, i) => {
            let value = values[key]
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
        console.log('props value', this.props.casefilter)

        return (
            <div className="filter-panel">
                <div className="chip-panel">
                    {this.renderChips()}
                </div>
                <Filter/>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        casefilter: state.form.casefilter
    }
}



export default connect(mapStateToProps,{change})(FilterPanel);

