import types from './types';


/********************* ACTIVE CASE *************************/
export function setActiveCaseType(caseType) {
    return {
        type: types.SET_ACTIVE_CASE_TYPE,
        payload: caseType
    }
}

export function setActiveAnimalType(animalType) {
    return {
        type: types.SET_ACTIVE_ANIMAL_TYPE,
        payload: animalType
    }
}

export function setActiveAnimalSize(animalSize) {
    return {
        type: types.SET_ACTIVE_ANIMAL_SIZE,
        payload: animalSize
    }
}

/********************* CASE FILTERS *************************/

export function setCaseFilterValues(values) {
    return {
        type: types.SET_CASE_FILTER_VALUES,
        payload: values
    }
}