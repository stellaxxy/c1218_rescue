import { combineReducers } from 'redux';
import activeCaseReducer from './active_case_reducer';

const rootReducer = combineReducers({
    activeCase: activeCaseReducer
});

export default rootReducer;