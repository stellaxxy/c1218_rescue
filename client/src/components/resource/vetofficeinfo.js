import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PetImage from "../../assets/images/image11.jpg";
import axios from 'axios';
import './vetofficeinfo.scss';

class OfficeInfo extends Component {
    state = {
      data: null
    };

    async componentDidMount(){

        const {id} = this.props.match.params;
        //console.log(id);
        const result = await axios.get(`/api/yelp/details?id=${id}`);
        //console.log('result:',result);
        this.setState({
            data: result.data.data
        })
    }

    render() {
        if(!this.state.data){
            return(
                <div>Loading</div>
            );
        }


        console.log(this.state.data);
        const { display_phone, hours, image_url, location, name, rating } = this.state.data;
        console.log('hours:', hours[0].open);

        let address1 = '';
        let address2 = '';
        if(location.display_address[2]){
            address1 = location.display_address[0] + " " + location.display_address[1];
            address2 = location.display_address[2];
        } else {
            address1 = location.display_address[0];
            address2 = location.display_address[1];
        }

        //const date = new Date();
        //const day = date.getDay();
        const arrayOfHours = hours[0].open;
        const arrayOfDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const hoursDiv = arrayOfHours.map(item => {
           const dayOfWeek = arrayOfDays[item.day];
           return <div>{dayOfWeek}: {item.start} to {item.end}</div>
        });

        return (

            <div className="w3-container">
                <div>
                    <h4>{name}</h4>
                    <div>Address: {address1}</div>
                    <div>{address2}</div>
                    <div>Rating: {rating}</div>
                    <div>Hours: 9am to 6pm(Mon to sat)</div>
                </div>
                <div className="card horizontal">
                    <img src={image_url} className="vetDetailImage"/>
                </div>
                <div>
                    <Link to="/casedetails" className="waves-effect waves-light btn orange text-white call">Call</Link>
                </div>
            </div>

        )
    }
}
export default OfficeInfo;