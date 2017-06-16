import { Record } from 'immutable';

import * as types from '../constants';

const SystemManager = new Record({
  createdManager: { // created User - system or restaurant manager
    id: null,
    email: null,
    userName: null,
    token: null,
    firstName: null,
    lastName: null,
    shirtSize: null,
    shoeSize: null
  },
  createdRestaurant: { // created restaurant
    id: null,
    name: null,
    description: null
  },
  inProgress: false
});

const initialState = new SystemManager();

const sysManagerReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case types.ADD_SYS_MANAGER_SUCCESS:
      return state
        .set('createdManager',action.payload.createdManager) // novi men. sistema
        .set('inProgress', false);

    case types.ADD_RES_MANAGER_SUCCESS:
      return state
        .set('createdManager',action.payload.createdManager) // novi men. restorana
        .set('inProgress', false);

    case types.ADD_RESTAURANT_SUCCESS:
      return state
        .set('createdRestaurant',action.payload.createdRestaurant)
        .set('inProgress', false);

    case types.ADD_SYS_MANAGER_ERROR:
    case types.ADD_RES_MANAGER_ERROR:
    case types.ADD_RESTAURANT_ERROR:
      return state.set('inProgress', false);

    case types.ADD_SYS_MANAGER_STARTED:
    case types.ADD_RES_MANAGER_STARTED:
    case types.ADD_RESTAURANT_STARTED:
      return state.set('inProgress', true);

    default:
      return state;
  }
};

export default sysManagerReducer;