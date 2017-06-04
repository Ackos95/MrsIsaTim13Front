import { combineReducers } from 'redux'
import auth from './auth'
import main from './main';
import manager from './manager';
// import visibilityFilter from './visibilityFilter'

const reducers = combineReducers({
  auth,
  main,
  manager
})

export default reducers;