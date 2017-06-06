import { combineReducers } from 'redux'
import auth from './auth'
import main from './main';
import manager from './manager';
import guest from './guest';
import supplier from './supplier';

// import visibilityFilter from './visibilityFilter'

const reducers = combineReducers({
  auth,
  main,
  manager,
  supplier,
	guest
})

export default reducers;