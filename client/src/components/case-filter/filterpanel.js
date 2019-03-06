import React, {Component} from 'react';
import './filterform.scss';
import {connect} from 'react-redux';
import Filter from './filtermodal';
import {change} from 'redux-form';



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
        if (!this.props.casefilter) {
            return chips;
        }
        const {values} = this.props.casefilter;
        if (!values) {
            return chips;
        }

        console.log('chip panel values',values);

        if(!values){
            return null;
        }

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
        console.log('props value', this.props.casefilter)

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
        casefilter: state.form.casefilter
    }
}



export default connect(mapStateToProps,{change})(FilterPanel);

