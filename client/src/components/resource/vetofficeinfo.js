import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PetImage from "../../assets/images/image11.jpg";
import axios from 'axios';
import './vetofficeinfo.scss';
import queryString from 'query-string';

class OfficeInfo extends Component {
    state = {
        data: null,
        location: null
    };

    async componentDidMount(){
        console.log('vet info url:', this.props.location.search);
        const query = this.props.location.search;
        const queryObj =  queryString.parse(query);
        const {location} = queryObj;
        console.log('location:', location);


        const {id} = queryObj;
        //console.log(id);
        const result = await axios.get(`/api/yelp/details?id=${id}`);
        //console.log('result:',result);
        this.setState({
            data: result.data.data,
            location: location
        })
    }

    render() {
        if(!this.state.data){
            return(
                <div>Loading</div>
            );
        }

        const { display_phone, hours, image_url, location, name, rating } = this.state.data;
       // console.log('hours:', hours[0].open);
       // console.log('phone:', display_phone);
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
           let start = item.start.split('');
           start.splice(2, 0, ':');
           start = start.join('');

           let end = item.end.split('');
           end.splice(2, 0, ':');
           end = end.join('');

           return <div key={dayOfWeek}>{dayOfWeek}: {start} to {end}</div>
        });

        const goBackUrl = queryString.stringify({location: this.state.location});
        console.log('gobackurl:', goBackUrl);

        return (

            <div className="w3-container bottomContainer">
                <div className="vetInformation">
                    <h4>{name}</h4>
                    <div>Address: {address1}</div>
                    <div>{address2}</div>
                    <div>Rating: {rating}</div>
                    <div>Hours: {hoursDiv}</div>
                </div>
                <div className="imgContainer">
                    <img src={image_url} className="vetDetailImage"/>
                </div>
                <div className="callContainer">
                    <Link to={`/searchvet?${goBackUrl}`} className="waves-effect waves-light btn orange text-white call">Go Back</Link>
                    <Link to={`tel:+${display_phone}`} className="waves-effect waves-light btn orange text-white call">Call</Link>
                </div>
            </div>

        )
    }
}
export default OfficeInfo;