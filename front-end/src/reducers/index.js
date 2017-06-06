import { combineReducers } from 'redux'
import auth from './auth'
import main from './main';
import manager from './manager';
import guest from './guest';
import supplier from './supplier';
import supplies from './supplies';

// import visibilityFilter from './visibilityFilter'

const reducers = combineReducers({
  auth,
  main,
  manager,
  supplier,
  supplies, // note the 's'
	guest
})

export default reducers;