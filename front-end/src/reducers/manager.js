import { Record } from 'immutable';

import * as types from '../constants';

const RestaurantManager = new Record({
  created: { // created User - employee or supplier
    id: null,
    email: null,
    userName: null,
    token: null,
    firstName: null,
    lastName: null,
    shirtSize: null,
    shoeSize: null,
  },
  createdRequest: { // created supply request
    id: null,
    publishingDate: null,
    endingDate: null,
    ended: null,
    restaurant: { id: null }
  },
  inProgress: false
});

const initialState = new RestaurantManager();

const managerReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case types.ADD_EMPLOYEE_SUCCESS:
      return state
        .set('created',action.payload.created) // novi zaposleni
        .set('inProgress', false);

    case types.ADD_SUPPLIER_SUCCESS:
      return state
        .set('created',action.payload.created) // novi dobavljač
        .set('inProgress', false);

    case types.ADD_SUPPLY_REQUEST_SUCCESS:
      return state
        .set('new',action.payload.createdRequest) // nova potražnja
        .set('inProgress', false);

    case types.ADD_EMPLOYEE_ERROR:
    case types.ADD_SUPPLIER_ERROR:
    case types.ADD_SUPPLY_REQUEST_ERROR:
      return state.set('inProgress', false);

    case types.ADD_EMPLOYEE_STARTED:
    case types.ADD_SUPPLIER_STARTED:
    case types.ADD_SUPPLY_REQUEST_STARTED:
      return state.set('inProgress', false);

    default:
      return state;
  }
};

export default managerReducer;