import { combineReducers } from 'redux';
import activeCaseReducer from './active_case_reducer';
import caseFilterReducer from './case_filter_reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    activeCase: activeCaseReducer,
    caseFilters: caseFilterReducer,
    form: formReducer
});

export default rootReducer;