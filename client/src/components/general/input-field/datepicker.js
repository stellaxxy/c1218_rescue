import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
//import { parseISO } from 'date-fns';

class RenderDatePicker extends Component{
    state = {
        startDate: new Date(this.props.initialDate)
    };

    handleChange = date => {
        console.log('handle change clicked');
        this.props.input.onChange(date);
        this.setState({
            startDate: date
        });
    };
/*
    componentDidMount(){
        this.setState({
            startDate: this.props.initialDate
        })
    }
*/
    render(){
        console.log('date picker', this.props);
        return(
            <DatePicker selected={this.state.startDate} onChange={this.handleChange}/>
        )
    }
}

export default RenderDatePicker;
//selected={this.state.startDate} onChange={value=>this.props.input.onChange(value)}