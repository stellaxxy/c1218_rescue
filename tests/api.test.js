/**
 * Tests Node Web API using MySQL data from dummyData/schema.sql
 */

const axios = require("axios");

function checkInvalidRequest(response, errorText) {
  expect(response).toBeDefined();
  expect(response.data.success).toEqual(false);  
  expect(response.data.errorMessage).toContain(errorText);
}

function checkValidCaselist(response, expectedAnimalTypes) {
  const caseProps = ['id','typeOfAnimal','typeOfCase','location','coverImg'];
  const locationProps = ['city','street','zipCode','longitude','latitude'];

  expect(response).toBeDefined();
  expect(response.data.success).toEqual(true);

  const {data} = response.data;
  expect(data).toBeDefined();
  expect(data.length).toEqual(expectedAnimalTypes.length); 

  data.forEach((item, i) => {
    expect(item.typeOfAnimal).toEqual(expectedAnimalTypes[i]);
    caseProps.forEach(prop => expect(item).toHaveProperty(prop));
    locationProps.forEach(prop => expect(item).toHaveProperty(['location', prop]));
  });
}

describe('caselist endpoint', () => {

  it('handles request for all cases', () => {
    return axios.get('http://localhost:9000/api/caselist/')
    .then(response => {
      checkValidCaselist(response, ['dog','dog','cat']);
    })
  })

  it('rejects request for unknown case type', () => {
    return axios.get('http://localhost:9000/api/caselist/?case_type=madeup')
    .then(response => {
      checkInvalidRequest(response, 'Invalid value');
    })
  })

  it('handles request for lost animal cases', () => {
    return axios.get('http://localhost:9000/api/caselist/?case_type=lost')
    .then(response => {
      checkValidCaselist(response, ['dog']);
    })
  })

  it('handles request for found animal cases', () => {
    return axios.get('http://localhost:9000/api/caselist/?case_type=found')
    .then(response => {
      checkValidCaselist(response, ['dog','cat']);
    })
  })
})