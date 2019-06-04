import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


class RenderDatePicker extends Component{
    state = {
        startDate: new Date(this.props.initialDate)
    };
    //-----------------------------------------------------------------------------------------
    // HANDLE DATE CHANGE
    //-----------------------------------------------------------------------------------------
    handleChange = date => {
        this.props.input.onChange(date);
        this.setState({
            startDate: date
        });
    };

    render(){
        return(
            <DatePicker selected={this.state.startDate} onChange={this.handleChange}/>
        )
    }
}

export default RenderDatePicker;
