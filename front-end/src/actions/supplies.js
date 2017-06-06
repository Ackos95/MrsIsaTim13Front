import * as types from '../constants';

import { SERVER_URL } from '../config';

import { $get, addAuthHeader } from '../utils/http';


/** ** ** ** ** **
 *  GET REQUESTS
 ** ** ** ** ** **/

export const getRequestsStart = () => ({
  type: types.GET_REQUESTS_STARTED
});

export const getRequestsError = () => ({
  type: types.GET_REQUESTS_ERROR
});

export const getRequestsSuccess = ( requests ) => ({
  type: types.GET_REQUESTS_SUCCESS,
  payload: requests
});


export const getRequests = ( token ) => dispatch => {
  dispatch(getRequestsStart());

  console.log('id ~ token~');
  console.log(token); // tu je i token
  console.log(token.token); // tu je i token

  $get(`${SERVER_URL}/supplies/restaurantRequests`,
    null, addAuthHeader(token))
    .then((res) => {
      // here will go if (res.status > 400) dispatch(__Error());
      console.log('res');
      console.log(res);

      const { data } = res;
      return dispatch(getRequestsSuccess({requests: data}))
    })
    .catch((err) => {
      console.log('err');
      console.log(err);
      return dispatch(getRequestsError());
    });
};