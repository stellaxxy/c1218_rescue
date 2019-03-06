import React, {Component} from 'react';
import '../assets/css/casemap.scss';
import axios from 'axios';
import config from '../../../config/api';
import foundIcon from '../assets/images/icons8-region-filled-48.png';
import lostIcon from '../assets/images/icons8-region-48.png';


class CaseMap extends Component {

    componentDidMount() {
        window.initMap = this.initMap.bind(this);
        loadJS('https://maps.googleapis.com/maps/api/js?key='+config.googleMapApi+'&callback=initMap');

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
                    contentString = `<a href="/casedetails/${item.id}"><img src=${img} alt="pet picture"/></a><div><p>Found on ${item.location.location}, ${item.location.zipcode}</p></div>`;
                } else if(item.caseType === 'lost') {
                    contentString = `<a href="/casedetails/${item.id}"><img src=${img} alt="pet picture"/></a><div><p>Last seen on ${item.location.location}, ${item.location.zipcode}</p></div>`;

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
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
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


