import { combineReducers } from 'redux';
import activeCaseReducer from './active_case_reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    activeCase: activeCaseReducer,
    form: formReducer
});

export default rootReducer;