import types from './types';

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