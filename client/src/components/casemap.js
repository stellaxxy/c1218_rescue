import React, {Component} from 'react';
import '../assets/css/casemap.scss';
import axios from 'axios';
import config from '../../../config/api';
import foundIcon from '../assets/images/icons8-region-filled-48.png';
import lostIcon from '../assets/images/icons8-region-48.png';
import m1 from '../googleMapClustering/m1.png';
import m2 from '../googleMapClustering/m2.png';
import m3 from '../googleMapClustering/m3.png';
import m4 from '../googleMapClustering/m4.png';
import m5 from '../googleMapClustering/m5.png';
import '../googleMapClustering/markerclusterer.js'

class CaseMap extends Component {

    componentDidMount() {
        window.initMap = this.initMap.bind(this);
        loadJS('https://maps.googleapis.com/maps/api/js?key='+config.googleMapApi+'&callback=initMap');
        loadJS('../googleMapClustering/markerclusterer.js');
    }

    async renderMarkers(map){
        const icons = {
            found: foundIcon,
            lost: lostIcon
        };

        const result = await axios.get('/api/caselist');

        if(result.data.success === true){
            const markers = result.data.data.map(item => {
                const longitude = item.location.longitude;
                const latitude = item.location.latitude;

                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(latitude, longitude),
                    icon: icons[item.caseType],
                    map: map
                });
                console.log(item);
                const img = item.coverImg;
                let contentString = '';

                if (item.caseType === 'found'){
                    contentString = `<a href="/casedetails/${item.id}"><img src=${img} alt="pet picture"/></a><div><p>Found on ${item.location.street}, ${item.location.zipcode}</p></div>`;
                } else if(item.caseType === 'lost') {
                    contentString = `<a href="/casedetails/${item.id}"><img src=${img} alt="pet picture"/></a><div><p>Last seen on ${item.location.street}, ${item.location.zipcode}</p></div>`;
                }


                const infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                marker.addListener('click', () => {
                    infowindow.open(map, marker);
                });

                return marker;
            });

            const markerCluster = new MarkerClusterer(map, markers,
                {imagePath: '../googleMapClustering/m'});
            //'../googleMapClustering/m' 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        }
    }

    initMap() {
        var renderedMap = new google.maps.Map(document.getElementById("map"), {

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


