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

export const restaurantRating = (restaurantId, dateFrom, dateTo, token) => dispatch => {
  dispatch(restaurantRatingStarted());
  console.log('restaurant Grade: (id,from,to,token) ', restaurantId, dateFrom, dateTo, token);

  $get(`${SERVER_URL}/reports/${restaurantId}/earnings?dateFrom=${dateFrom}&dateTo=${dateTo}`,
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



/*** MEAL ***/
export const mealReportStarted = () => ({
  type: types.MEAL_REPORT_STARTED
});
export const mealReportSuccess = (reportData) => ({
  type: types.MEAL_REPORT_SUCCESS,
  payload: { reportData }
});
export const mealReportError = () => ({
  type: types.MEAL_REPORT_ERROR
});

export const mealReport = (mealId, token) => dispatch => {
  dispatch(mealReportStarted());
  console.log(mealId, token);
  
};

/*** WAITER ***/

/*** VISITS ***/

/*** EARNINGS (RESTAURANT) ***/

/*** WAITER EARNINGS ***/