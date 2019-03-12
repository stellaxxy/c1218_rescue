import React, {Component} from 'react';
import './map.scss';
import axios from 'axios';
import config from '../../../../config/api';
import foundIcon from "../../assets/images/icons8-region-filled-48.png";
import lostIcon from "../../assets/images/icons8-region-48.png";
//import foundIcon from '../assets/images/icons8-region-filled-48.png';
//import lostIcon from '../assets/images/icons8-region-48.png';


class Map extends Component {

    componentDidMount() {
        //console.log('map props:', this.props);
        window.initMap = this.initMap.bind(this);
        loadJS('https://maps.googleapis.com/maps/api/js?key='+config.googleMapApi+'&callback=initMap');

    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){

            window.initMap = this.initMap.bind(this);
            loadJS('https://maps.googleapis.com/maps/api/js?key='+config.googleMapApi+'&callback=initMap');
        }
    }

    async renderMarkers(params){
            if(!this.props.data || this.props.data.length === 0){
                return(
                    <div>Loading</div>
                );
            }

            const query = this.props.queryString;

            const markers = this.props.data.map(item => {
                const longitude = item.coordinates.longitude;
                const latitude = item.coordinates.latitude;

                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(latitude, longitude),
                    map: this.renderedMap
                });

                // To add the marker to the map, call setMap();
                marker.setMap(this.renderedMap);
                let infoUrl = '/vetoffice'+query+'&id='+item.id;

                const img = item.image_url;
                let contentString = `<a href=${infoUrl}><img class="vetMapImg" src=${img} alt="vet"/></a><div><p>${item.name}</p></div>`;


                const infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                marker.addListener('click', () => {
                    infowindow.open(this.renderedMap, marker);
                })


                return marker;
            });

            const markerCluster = new MarkerClusterer(this.renderedMap, markers,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

    }

    initMap() {
        this.renderedMap = new google.maps.Map(document.getElementById("vetMap"), {

            center: {
                lat: 33.6846,
                lng: -117.8265
            },
            zoom: 10,
            gestureHandling: 'greedy'
        });

        this.renderMarkers();
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
