import { Record } from 'immutable';

import * as types from '../constants';

const Supplies = new Record({
  requests: [],
  inProgress: false // something is loading (GET / POST)
});

const initialState = new Supplies();

const suppliesReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case types.GET_REQUESTS_SUCCESS:
      return state
        .set('requests',action.payload.requests) // dobijeni zahtjevi
        .set('inProgress', false);

    // case types._SUCCESS:
    //   return state
    //     .set('XXX',action.payload.XXX) // nova XXX
    //     .set('inProgress', false);

    case types.GET_REQUESTS_ERROR:
    // case types._ERROR:
      return state.set('inProgress', false);

    case types.GET_REQUESTS_STARTED:
    // case types._STARTED:
      return state.set('inProgress', true);

    default:
      return state;
  }
};

export default suppliesReducer;