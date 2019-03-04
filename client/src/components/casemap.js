import React, {Component} from 'react';
import '../assets/css/casemap.scss';
import dog from '@fortawesome/fontawesome-free/svgs/solid/dog.svg';
import cat from '@fortawesome/fontawesome-free/svgs/solid/cat.svg';
import other from '@fortawesome/fontawesome-free/svgs/solid/horse.svg'
import axios from 'axios';

class CaseMap extends Component {

    componentDidMount() {
        window.initMap = this.initMap.bind(this);
        loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAb8_xYpdmVAx63QPRfw-M8VaKUsJuHzO0&callback=initMap');
    }

    async renderMarkers(map){
        const icons = {
            dog: {
                url: dog,
                scaledSize: new google.maps.Size(30, 30),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 0),
                color: 'red'
            },
            cat: {
                url: cat,
                scaledSize: new google.maps.Size(30, 30),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 0)
            },
            other: {
                url: other,
                scaledSize: new google.maps.Size(30, 30),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 0)
            }
        };

        const result = await axios.get('/api/caselist');
        /*
        const markers = result.data.data.map(item => {
            //console.log(item.location.longitude);
            const longitude = item.location.longitude;
            const latitude = item.location.latitude;
            //console.log('item:', item.animalType);
            return new google.maps.Marker({
                position: new google.maps.LatLng(latitude, longitude),
                icon: icons[item.animalType],
                map: map
            });
        });
        console.log(markers);

        const markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
        */

        result.data.data.forEach(item => {
            const longitude = item.location.longitude;
            const latitude = item.location.latitude;
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(latitude, longitude),
                icon: icons[item.animalType],
                map: map
            });
        });
    }

    showCluster(map) {
        var locations = [
            {lat: 33.1846, lng: -117.1265},
            {lat: 33.1847, lng: -117.1266},
            {lat: 33.1848, lng: -117.1267},
        ];

        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var markers = locations.map(function (location, i) {
            return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length]
            });
        });
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

    }

    initMap() {
        var map = new google.maps.Map(document.getElementById("map"), {

            center: {
                lat: 33.6846,
                lng: -117.8265
            },
            zoom: 10

        });
        this.renderMarkers(map);
        //this.showCluster(map)
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


