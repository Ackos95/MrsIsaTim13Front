import { Record } from 'immutable';
import * as types from '../constants';

import {
  getBarmanSchedules,
  getWaiterSchedules,
  getCookSchedules
} from '../utils/scheduleHelpers';

const Employees = new Record({
  schedule: null,
  barmanSchedules: [],
  cookSchedules: [],
  waiterSchedules: [],
});

const initialState = new Employees();

const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SCHEDULE_SUCCESS:
      return state.set('schedule', action.payload)
              .set('barmanSchedules', getBarmanSchedules(action.payload.scheduleItems))
              .set('waiterSchedules', getWaiterSchedules(action.payload.scheduleItems))
              .set('cookSchedules', getCookSchedules(action.payload.scheduleItems));

    default:
      return state;
  }
}

export default employeesReducer;