import React, {Component} from 'react';
import '../assets/css/casemap.scss';
import axios from 'axios';
import config from '../../../config/api';
import foundIcon from '../assets/images/icons8-region-filled-48.png';
import lostIcon from '../assets/images/icons8-region-48.png';
// import FilterPanel from './case-filter';
import connect from "react-redux/es/connect/connect";


class CaseMap extends Component {

    state = {
        error: false,
        cases: [],
        filters: []
    };

    componentDidMount() {
        window.initMap = this.initMap.bind(this);
        loadJS('https://maps.googleapis.com/maps/api/js?key='+config.googleMapApi+'&callback=initMap');
    }

    clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName];
            }
        }
        return Object.keys(obj).length==0 ? null : obj
    }

    async renderMarkers(params) {

        const icons = {
            found: foundIcon,
            lost: lostIcon
        };

        let filterValues = Object.assign({}, this.props.filterValues);

        filterValues = this.clean(filterValues)

        let filters = this.state.filters
        if (params && params.remove) {
            var keys = Object.keys(params.remove)
            keys.forEach((key) => {
                delete filterValues[key]
                delete filters[key]
            })
        }
        console.log('clean:', filterValues);
        console.log('params', params);
        console.log('props' , this.props);


        const {caseType, animalType, size, zipcode, city} = filterValues || params || this.props;
        const queryStringArray = [{caseType}, {animalType}, {size}, {zipcode}, {city}];

        let endpointString = '/api/caselist?';

        queryStringArray.map(item => {
            if (Object.values(item)[0]) {
                if (endpointString[endpointString.length - 1] !== '?') {
                    endpointString = endpointString + '&';
                }
                endpointString = endpointString + Object.keys(item)[0] + '=' + Object.values(item)[0];
                filters.push(Object.keys(item)[0])
            }
        });


        const result = await axios.get(endpointString);

        if (result.data.success === true) {
            const markers = result.data.data.map(item => {
                const longitude = item.location.longitude;
                const latitude = item.location.latitude;

                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(latitude, longitude),
                    icon: icons[item.caseType],
                    map: this.renderedMap
                });
              
                // To add the marker to the map, call setMap();
                marker.setMap(this.renderedMap);

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
                    infowindow.open(this.renderedMap, marker);
                })


                return marker;
            });

            const markerCluster = new MarkerClusterer(this.renderedMap, markers,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
        }
    }

    initMap() {
         this.renderedMap = new google.maps.Map(document.getElementById("map"), {

            center: {
                lat: 33.6846,
                lng: -117.8265
            },
            zoom: 10,
            gestureHandling: 'greedy'
        });

        this.renderMarkers();
    }

    applyFilter(params) {
        console.log('casemap: ',params);
        this.renderMarkers(params);


    }

    render() {
        return (
            <div>
                {/* <FilterPanel applyFilter={this.applyFilter.bind(this)}/> */}
                <div id="map">
                </div>

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


function mapStateToProps(state) {
    return {
        filterValues: state.caseFilters.values
    }
}

export default connect(mapStateToProps)(CaseMap);



