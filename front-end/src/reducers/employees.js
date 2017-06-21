import { Record } from 'immutable';
import * as types from '../constants';

const Employees = new Record({
  schedule: null
});

const initialState = new Employees();

const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SCHEDULE_SUCCESS:
      return state.set('schedule', action.payload);

    default:
      return state;
  }
}

export default employeesReducer;