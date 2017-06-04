import { Record } from 'immutable';

import * as types from '../constants';

const RestaurantManager = new Record({
  createdEmployee: {
    id: null,
    email: null,
    userName: null,
    token: null,
    firstName: null,
    lastName: null,
    shirtSize: null,
    shoeSize: null,
  },
  inProgress: false
});

const initialState = new RestaurantManager();

const managerReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case types.ADD_EMPLOYEE_SUCCESS:
      return state
        .set('createdEmployee',action.payload.createdEmployee)
        .set('inProgress', false);

    case types.ADD_EMPLOYEE_ERROR:
      return state.set('inProgress', false);

    case types.ADD_EMPLOYEE_STARTED:
      return state.set('inProgress', true);

    default:
      return state;
  }
};

export default managerReducer;