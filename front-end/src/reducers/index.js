import { combineReducers } from 'redux'
import auth from './auth';
import main from './main';

// import visibilityFilter from './visibilityFilter'

const reducers = combineReducers({
  auth,
  main
});

export default reducers;