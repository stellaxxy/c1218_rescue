/**
 * Provides configured @google/maps client with convenience methods
 */
const {googleMapApi} = require('../config/api');

const googleMaps = require('@google/maps').createClient({
    key: googleMapApi,
    Promise: Promise
});

/**
 * @param {*} geocodeResult - One result from `json.results` returned by GoogleMaps geocode method
 * @param {*} key - Key of address component to return.  e.g. 'locality', 'postal_code'
 * @returns short_name for address component if found, else NULL
 */
const getAddressComponentShortName = ( geocodeResult, key ) => {
    const addressComponents = geocodeResult.address_components;
    if (addressComponents) {
        const filteredComponents = addressComponents.filter(comp => comp.types.indexOf(key) !== -1);
        if (filteredComponents && filteredComponents.length) {
            return filteredComponents[0].short_name;
        }
    }  
    
    return null;
}

/**
 * @param {string} location - Text description of location to lookup via GoogleMaps geocode API
 * @returns Object with properties: latitude, longitude, city, zipcode.  Any not found are NULL.
 */
const getAddress = async (location) => {
    const address = {
        latitude: null,
        longitude: null,
        city: null,
        zipcode: null
    }

    let result = await googleMaps.geocode({address: location}).asPromise();
    if (!result || !result.json.results || !result.json.results.length) return address;

    let firstResult = result.json.results[0];
    if (!firstResult.geometry || !firstResult.geometry.location) return address;

    address.latitude = firstResult.geometry.location.lat;
    address.longitude = firstResult.geometry.location.lng;

    address.city = googleMaps.getAddressComponentShortName(firstResult, 'locality');

    result = await googleMaps.reverseGeocode({
        latlng: [address.latitude, address.longitude],
    }).asPromise();

    if (!result || !result.json.results || !result.json.results.length) return address;
    
    firstResult = result.json.results[0];
    address.zipcode = googleMaps.getAddressComponentShortName(firstResult, 'postal_code');

    return address;
}

googleMaps.getAddressComponentShortName = getAddressComponentShortName;
googleMaps.getAddress = getAddress;

module.exports = googleMaps;