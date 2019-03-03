import types from '../actions/types';

const DEFAULT_STATE = {
    caseType: null,
    animalType: null,
    animalSize: null
};

function activeCaseReducer(state = DEFAULT_STATE, action) {
    switch(action.type) {
        case types.SET_ACTIVE_CASE_TYPE:
            return { ...state, caseType: action.payload };
        case types.SET_ACTIVE_ANIMAL_TYPE:
            return { ...state, animalType: action.payload };
        case types.SET_ACTIVE_ANIMAL_SIZE:
            return { ...state, animalSize: action.payload };
        default:
            return state;
    }
}

export default activeCaseReducer;