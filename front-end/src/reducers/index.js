import { combineReducers } from 'redux'
import auth from './auth'
import main from './main';
import manager from './manager';
import employees from './employees';
import sys_manager from './sys_manager';
import guest from './guest';
import supplier from './supplier';
import supplies from './supplies';
import restaurant from './restaurant';

// import visibilityFilter from './visibilityFilter'

const reducers = combineReducers({
  auth,
  main,
  manager,
  employees,
  sys_manager,
  supplier,
  supplies, // note the 's'
  restaurant,
	guest
});

export default reducers;