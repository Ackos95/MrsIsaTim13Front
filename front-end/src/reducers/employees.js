import { Record } from 'immutable';
import * as types from '../constants';

import {
  getBarmanSchedules,
  getWaiterSchedules,
  getCookSchedules,
  getActiveOrders
} from '../utils/employeeHelpers';

const Employees = new Record({
  schedule: null,
  barmanSchedules: [],
  cookSchedules: [],
  waiterSchedules: [],
  orders: [],
});

const initialState = new Employees();

const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SCHEDULE_SUCCESS:
      return state.set('schedule', action.payload)
              .set('barmanSchedules', getBarmanSchedules(action.payload.scheduleItems))
              .set('waiterSchedules', getWaiterSchedules(action.payload.scheduleItems))
              .set('cookSchedules', getCookSchedules(action.payload.scheduleItems));

    case types.LOAD_ORDERS_SUCCESS:
      return state.set('orders', getActiveOrders(action.payload));

    default:
      return state;
  }
}

export default employeesReducer;