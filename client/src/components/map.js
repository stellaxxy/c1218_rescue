import React, {Component} from 'react';
import '../assets/css/map.scss';
import axios from 'axios';
import config from '../../../config/api';
//import foundIcon from '../assets/images/icons8-region-filled-48.png';
//import lostIcon from '../assets/images/icons8-region-48.png';


class Map extends Component {

    componentDidMount() {
        window.initMap = this.initMap.bind(this);
        loadJS('https://maps.googleapis.com/maps/api/js?key='+config.googleMapApi+'&callback=initMap');

    }

    async renderMarkers(map){
        console.log('map works')
    }

    initMap() {
        var renderedMap = new google.maps.Map(document.getElementById("vetMap"), {

            center: {
                lat: 33.6846,
                lng: -117.8265
            },
            zoom: 10,
            gestureHandling: 'greedy'
        });

        this.renderMarkers(renderedMap);
    }

    render() {
        return (
            <div id="vetMap">

            </div>
        );
    }
}

function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}


export default Map;


