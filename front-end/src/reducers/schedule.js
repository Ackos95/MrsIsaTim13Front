import { Record } from 'immutable';

import * as types from '../constants';

const Schedule = new Record({
  inProgress: false, // get/update u toku
  confirmationInProgress: false, // da li je update zavrsen,
  selectedItem: null, // trenutno selektovani termin iz rasporeda
  employees: [],
  schedule: {
    scheduleItems: []
  },
  // restaurantId: -1,
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

    case types.ADD_TERMIN_SUCCESS:
    {
      let schedule = state.schedule;
      schedule.scheduleItems = [...schedule.scheduleItems, action.payload.createdTermin];
      console.log('novi schedule');
      console.log(schedule);
      return state
        .set('schedule', schedule)
        .set('inProgress', false);
    }

    case types.DELETE_TERMIN_SUCCESS:
    {
      console.log('stigao obrisani id: ' + action.payload.deletedItemId + ' itema: ' + state.schedule.scheduleItems.length);

      const updatedSchedule = state.schedule;

      updatedSchedule.scheduleItems = state.schedule.scheduleItems.filter(t => t.id !== action.payload.deletedItemId);
      console.log('sada itema: ' + updatedSchedule.scheduleItems.length);

      return state
        .set('selectedItem', null) // reset odabranog stola
        .set('schedule', updatedSchedule)
        .set('inProgress', false)
        .set('confirmationInProgress', true);
    }

    case types.ADD_TERMIN_ERROR:
    case types.DELETE_TERMIN_ERROR:
    case types.LOAD_EMPLOYEES_ERROR:
    case types.LOAD_SCHEDULE_ERROR:
      return state.set('inProgress', false);

    case types.SELECT_SCHEDULE_ITEM:
      return state
        .set('selectedItem', action.payload.selectedItem);

    // case types.LOGIN_SUCCESS:
    // {
    //   console.log('LOGIN SUCCESS U RESTAURANT REDUCERU! restoran:');
    //   console.log(action.payload.user.restaurant);
    //   return state
    //     .set('restaurantId', action.payload.user.restaurant.id);
    // }

    default:
      return state;

  }
};

export default scheduleReducer;
