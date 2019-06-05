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
  const caseProps = ['id','animalType','caseType','location','coverImg'];
  const locationProps = ['city','location','zipcode','longitude','latitude'];

  expect(response).toBeDefined();
  expect(response.data.success).toEqual(true);

  const {data} = response.data;
  expect(data).toBeDefined();
  expect(data.length).toEqual(expectedAnimalTypes.length); 

  data.forEach((item, i) => {
    expect(item.animalType).toEqual(expectedAnimalTypes[i]);
    caseProps.forEach(prop => expect(item).toHaveProperty(prop));
    locationProps.forEach(prop => expect(item).toHaveProperty(['location', prop]));
  });
}

describe('caselist endpoint', () => {

  it('handles search for all cases', () => {
    return axios.get('http://localhost:9000/api/caselist/')
    .then(response => {
      checkValidCaselist(response, ['dog','dog','cat']);
    })
  })

  it('rejects search for unknown case type', () => {
    return axios.get('http://localhost:9000/api/caselist/?case_type=madeup')
    .then(response => {
      checkInvalidRequest(response, 'Invalid value');
    })
  })

  it('handles search for lost animal cases', () => {
    return axios.get('http://localhost:9000/api/caselist/?case_type=lost')
    .then(response => {
      checkValidCaselist(response, ['dog']);
    })
  })

  it('handles search for found animal cases', () => {
    return axios.get('http://localhost:9000/api/caselist/?case_type=found')
    .then(response => {
      checkValidCaselist(response, ['dog','cat']);
    })
  })

  
  it('handles search by zipcode in DB', () => {
    return axios.get('http://localhost:9000/api/caselist/?zipcode=92618')
    .then(response => {
      checkValidCaselist(response, ['dog','dog','cat']);
    })
  })

  it('handles search by zipcode not in DB', () => {
    return axios.get('http://localhost:9000/api/caselist/?zipcode=13210')
    .then(response => {
      checkValidCaselist(response, []);
    })
  })

  it('handles search by city in DB', () => {
    return axios.get('http://localhost:9000/api/caselist/?city=Irvine')
    .then(response => {
      checkValidCaselist(response, ['dog','dog','cat']);
    })
  })

  it('handles search by city not in DB', () => {
    return axios.get('http://localhost:9000/api/caselist/?city=Philadelphia')
    .then(response => {
      checkValidCaselist(response, []);
    })
  })

  it('handles search by animal size', () => {
    return axios.get('http://localhost:9000/api/caselist/?size=small')
    .then(response => {
      checkValidCaselist(response, ['dog']);
    })
  })

  it('rejects search by invalid size', () => {
    return axios.get('http://localhost:9000/api/caselist/?size=marshmallow')
    .then(response => {
      checkInvalidRequest(response, 'Invalid value');
    })
  })

  it('handles search by animal type', () => {
    return axios.get('http://localhost:9000/api/caselist/?animal_type=dog')
    .then(response => {
      checkValidCaselist(response, ['dog','dog']);
    })
  })

  it('rejects search by invalid animal type', () => {
    return axios.get('http://localhost:9000/api/caselist/?animal_type=potato')
    .then(response => {
      checkInvalidRequest(response, 'Invalid value');
    })
  })

  it('handles search by gender', () => {
    return axios.get('http://localhost:9000/api/caselist/?gender=female')
    .then(response => {
      checkValidCaselist(response, ['dog']);
    })
  })

  it('rejects search by invalid gender', () => {
    return axios.get('http://localhost:9000/api/caselist/?gender=martian')
    .then(response => {
      checkInvalidRequest(response, 'Invalid value');
    })
  })

  it('handles search by color', () => {
    return axios.get('http://localhost:9000/api/caselist/?color=white')
    .then(response => {
      checkValidCaselist(response, ['cat']);
    })
  })

  it('rejects search by invalid color', () => {
    return axios.get('http://localhost:9000/api/caselist/?color=goo')
    .then(response => {
      checkInvalidRequest(response, 'Invalid value');
    })
  })

  it('handles search by multiple options', () => {
    return axios.get('http://localhost:9000/api/caselist/?animal_type=dog&color=black')
    .then(response => {
      checkValidCaselist(response, ['dog']);
    })
  })
})