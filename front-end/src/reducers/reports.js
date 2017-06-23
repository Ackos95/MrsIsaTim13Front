import { Record } from 'immutable';

import * as types from '../constants';

const Reports = new Record({
  grade: null, // ocjena restorana
  inProgress: false,
  // reportText: '', // naslov izvjestaja - postavlja se u akcijama // prebaceno U STATE
  restaurantRatingValue: -1,
  visitsGraphValue: -1,
  restaurantEarningsValue: -1,
  waitersEarningsValue: [],
});

const initialState = new Reports();

const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.VISITS_GRAPH_STARTED:
    case types.RESTAURANT_EARNINGS_STARTED:
    case types.WAITERS_EARNINGS_STARTED:
      return state
        .set('inProgress', true);

    case types.RESTAURANT_RATING_SUCCESS:
      return state
        .set('restaurantRatingValue', action.payload.restaurantRating)
        .set('inProgress', false);

    case types.RESTAURANT_RATING_ERROR:
      return state
        .set('inProgress', false);

    default:
      return state;
  }
};

export default reportsReducer;