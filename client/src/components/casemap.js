import React, {Component} from 'react';
import '../assets/css/casemap.scss';
import config from '../../../config/api';

class CaseMap extends Component {

    componentDidMount() {
        window.initMap = this.initMap.bind(this);
        loadJS('https://maps.googleapis.com/maps/api/js?key='+config.googleMapApi+'&callback=initMap');
    }

    showCluster(renderedMap) {
        var locations = [
            {lat: 33.1846, lng: -117.1265},
            {lat: 33.1847, lng: -117.1266},
            {lat: 33.1848, lng: -117.1267},
        ]
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var markers = locations.map(function (location, i) {
            return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length]
            });
        });
        var markerCluster = new MarkerClusterer(renderedMap, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

    }

    initMap() {
        var renderedMap = new google.maps.Map(document.getElementById("map"), {

            center: {
                lat: 33.6846,
                lng: -117.8265
            },
            zoom: 6

        })

        this.showCluster(renderedMap)
    }

    render() {
        return (
            <div id="map">

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


export default CaseMap;


