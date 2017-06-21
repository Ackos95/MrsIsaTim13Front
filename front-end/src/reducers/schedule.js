import { Record } from 'immutable';

import * as types from '../constants';

const Schedule = new Record({
  termins: [], // postojeći termini
  inProgress: false, // get/update u toku
  confirmationInProgress: false, // da li je update zavrsen,
  selectedEventId: -1, // ID u bazi od trenutno selektovanog termina iz rasporeda
  employees: [],
  schedule: null,
  selectedTerminId: -1,
});

const initialState = new Schedule();

const scheduleReducer = ( state = initialState, action ) => {
  switch (action.type) {

    case types.ADD_TERMIN_STARTED:
    case types.DELETE_TERMIN_STARTED:
    case types.LOAD_EMPLOYEES_STARTED:
    case types.LOAD_SCHEDULE_STARTED:
      return state.set('inProgress', true);

    case types.LOAD_SCHEDULE_SUCCESS:
      return state
        .set('schedule', action.payload.schedule)
        .set('inProgress', false);

    case types.LOAD_EMPLOYEES_SUCCESS:
      return state
        .set('employees', action.payload.employees)
        .set('inProgress', false);

    case types.ADD_TERMIN_ERROR:
    case types.DELETE_TERMIN_ERROR:
    case types.LOAD_EMPLOYEES_ERROR:
    case types.LOAD_SCHEDULE_ERROR:
      return state.set('inProgress', false);


    default:
      return state;

  }
};

export default scheduleReducer;
