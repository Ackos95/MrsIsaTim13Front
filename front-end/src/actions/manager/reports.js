import * as types from '../../constants/index';

import { SERVER_URL } from '../../config';

import { $get, addAuthHeader } from '../../utils/http';

/*** RESTAURANT RATING ***/
export const restaurantRatingStarted = () => ({
  type: types.RESTAURANT_RATING_STARTED
});
export const restaurantRatingSuccess = (restaurantRating) => ({
  type: types.RESTAURANT_RATING_SUCCESS,
  payload: restaurantRating // payload.restaurantRating
});
export const restaurantRatingError = () => ({
  type: types.RESTAURANT_RATING_ERROR
});

export const restaurantRating = (restaurantId, token) => dispatch => {
  dispatch(restaurantRatingStarted());
  console.log('restaurant Rating: (id, token) ', restaurantId, token);

  $get(`${SERVER_URL}/reports/${restaurantId}/rating`,
    undefined, addAuthHeader(token))
    .then((res) => {
      // here will go if (res.status > 400) dispatch(__Error());
      console.log('res');
      console.log(res);

      const { data } = res;
      return dispatch(restaurantRatingSuccess({restaurantRating: data}))
    })
    .catch((err) => {
      console.log('err');
      console.log(err);
      return dispatch(restaurantRatingError());
    });
};


/*** MEAL - not implemented ***/
/*** WAITER - not implemented ***/


/*** VISITS ***/
export const visitsGraphStarted = () => ({
  type: types.VISITS_GRAPH_STARTED
});
export const visitsGraphSuccess = (visitsResult) => ({
  type: types.VISITS_GRAPH_SUCCESS,
  payload: { visitsResult }
});
export const visitsGraphError = () => ({
  type: types.VISITS_GRAPH_ERROR
});

export const visitsGraph = (restaurantId, dateFrom, dateTo, token) => dispatch => {
  dispatch(visitsGraphStarted());
  console.log();
  
};

export const restaurantEarningsStarted = () => ({
  type: types.RESTAURANT_EARNINGS_STARTED
});
export const restaurantEarningsSuccess = (earnings) => ({
  type: types.RESTAURANT_EARNINGS_SUCCESS,
  payload: { earnings }
});
export const restaurantEarningsError = () => ({
  type: types.RESTAURANT_EARNINGS_ERROR
});

export const restaurantEarnings = (restaurantId, dateFrom, dateTo, token) => dispatch => {
  dispatch(restaurantEarningsStarted());
  console.log();
  
};

export const waitersEarningsStarted = () => ({
  type: types.WAITERS_EARNINGS_STARTED
});
export const waitersEarningsSuccess = (waitersEarningsList) => ({
  type: types.WAITERS_EARNINGS_SUCCESS,
  payload: waitersEarningsList
});
export const waitersEarningsError = () => ({
  type: types.WAITERS_EARNINGS_ERROR
});

export const waitersEarnings = (restaurantId, token) => dispatch => {
  dispatch(waitersEarningsStarted());
  console.log('restaurantId', 'token');
  console.log(restaurantId, token);

  
};


/*** EARNINGS (RESTAURANT) ***/

/*** WAITER EARNINGS ***/
