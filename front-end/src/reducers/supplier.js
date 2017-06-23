import { Record } from 'immutable';

import * as types from '../constants';

const Supplier = new Record({
  createdOffer: { // created supply offer
    id: null,
    guarantee: null,
    price: null,
    deliveredUntil: null,
    forRequest: null
  },
  requests: [],
  inProgress: false // something is loading (GET / POST)
});

const initialState = new Supplier();

const supplierReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case types.GET_REQUESTS_SUCCESS:
      return state
        .set('requests',action.payload.requests) // dobijeni zahtjevi
        .set('inProgress', false);

    case types.ADD_OFFER_SUCCESS:
      return state
        .set('createdOffer',action.payload.createdOffer) // nova ponuda
        .set('inProgress', false);

    // case types._SUCCESS:
    //   return state
    //     .set('XXX',action.payload.XXX) // nova XXX
    //     .set('inProgress', false);

    case types.GET_REQUESTS_ERROR:
    case types.ADD_OFFER_ERROR:
    // case types._ERROR:
      return state.set('inProgress', false);

    case types.GET_REQUESTS_STARTED:
    case types.ADD_OFFER_STARTED:
    // case types._STARTED:
      return state.set('inProgress', true);

    case types.END_SUP_REQ_SUCCESS: {
      let requestsToUpdate = [...state.requests];
      const endedRequestIndex = state.requests.findIndex(r => r.id === action.payload.endedRequest.id);
      console.log('Nadjen index: ' + endedRequestIndex);
      requestsToUpdate[endedRequestIndex] = action.payload.endedRequest;

      return state
        .set('requests', requestsToUpdate);
    }

    default:
      return state;
  }
};

export default supplierReducer;