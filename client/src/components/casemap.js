import React, {Component} from 'react';
import '../assets/css/casemap.scss';
import axios from 'axios';
import config from '../../../config/api';
import foundDog from '../assets/images/icons8-dog-24.png';
import lostDog from '../assets/images/icons8-dog-24-red.png';
import foundCat from '../assets/images/icons8-cat-24.png';
import lostCat from '../assets/images/icons8-cat-24-red.png';
import foundOther from '../assets/images/icons8-bull-24.png';
import lostOther from '../assets/images/icons8-bull-24-red.png'

class CaseMap extends Component {

    componentDidMount() {
        window.initMap = this.initMap.bind(this);
        loadJS('https://maps.googleapis.com/maps/api/js?key='+config.googleMapApi+'&callback=initMap');
        //loadJS('../googleMapClustering/markerclusterer.js');
    }

    async renderMarkers(map){
        const icons = {
            dog: {
                found: foundDog,
                lost: lostDog
            },
            cat: {
                found: foundCat,
                lost: lostCat
            },
            other: {
                found: foundOther,
                lost: lostOther
            }
        }
        ;
        const result = await axios.get('/api/caselist');

        //console.log(result);

        if(result.data.success === true){
            const markers = result.data.data.map(item => {
                const longitude = item.location.longitude;
                const latitude = item.location.latitude;

                return new google.maps.Marker({
                    position: new google.maps.LatLng(latitude, longitude),
                    icon: icons[item.animalType][item.caseType],
                    map: map
                });
            });

            const markerCluster = new MarkerClusterer(map, markers,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
//'../googleMapClustering/m'
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


