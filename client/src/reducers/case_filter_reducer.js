import types from '../actions/types';

const DEFAULT_STATE = {
    values: {
        zipcode: null,
        city: null,
        animalType: null,
        size: null,
        caseType: null
    }
};

function caseFilterReducer(state = DEFAULT_STATE, action) {
    switch(action.type) {
        case types.SET_CASE_FILTER_VALUES:
            return { ...state, values: action.payload };
        default:
            return state;
    }
}

export default caseFilterReducer;