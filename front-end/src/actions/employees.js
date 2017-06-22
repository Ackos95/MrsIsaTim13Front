import * as types from '../constants';
import { SERVER_URL } from '../config';

import { $get, $post, getToken, addAuthHeader } from '../utils/http';


export const loadScheduleStarted = () => ({
  type: types.FETCH_SCHEDULE_STARTED
});

export const loadScheduleError = (error) => ({
  type: types.FETCH_SCHEDULE_ERROR,
  error
});

export const loadScheduleSuccess = (data) => ({
  type: types.FETCH_SCHEDULE_SUCCESS,
  payload: data
});

export const loadSchedule = (restaurantId, userId, userToken) => dispatch => {
  console.log('here', userId);
  dispatch(loadScheduleStarted());

  $get(`${SERVER_URL}/restaurant/${restaurantId}/schedule`, undefined, addAuthHeader(userToken))
    .then((res) => {
      if (res.status >= 400)
        return dispatch(loadScheduleError(null));

      dispatch(loadScheduleSuccess(res.data));
    })
    .catch((err) => dispatch(loadScheduleError(err)));
}


export const loadOrdersStarted = () => ({
  type: types.LOAD_ORDERS_STARTED
});

export const loadOrdersError = (error) => ({
  type: types.LOAD_ORDERS_ERROR,
  error
});

export const loadOrdersSuccess = (orders) => ({
  type: types.LOAD_ORDERS_SUCCESS,
  payload: orders
});

export const loadOrders = userToken => dispatch => {
  dispatch(loadOrdersStarted());

  $get(`${SERVER_URL}/restaurant/orders`, undefined, addAuthHeader(userToken))
    .then((res) => {
      if (res.status >= 400)
        return dispatch(loadOrdersError(null))

      dispatch(loadOrdersSuccess(res.data));
    })
    .catch((err) => dispatch(loadOrdersError(err)));
}