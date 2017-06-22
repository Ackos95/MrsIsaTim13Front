import * as types from '../constants';
import { SERVER_URL } from '../config';

import { $get, $post, addAuthHeader } from '../utils/http';


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


export const setMealAcceptedStarted = () => ({
  type: types.SET_MEAL_ACCEPTED_STARTED
});

export const setMealAcceptedError = (error) => ({
  type: types.SET_MEAL_ACCEPTED_ERROR,
  error
});

export const setMealAcceptedSuccess = (mealInfo) => ({
  type: types.SET_MEAL_ACCEPTED_SUCCESS,
  payload: mealInfo
});

export const setMealAccepted = (mealInfoId, userToken) => dispatch => {
  dispatch(setMealAcceptedStarted());

  $post(`${SERVER_URL}/meal-info/${mealInfoId}/setAccepted`, undefined, addAuthHeader(userToken))
    .then((res) => {
      if (res.status >= 400)
        return dispatch(setMealAcceptedError(null));

      dispatch(setMealAcceptedSuccess(res.data));
    })
    .catch((err) => dispatch(setMealAcceptedError(err)));
}

export const setMealDoneStarted = () => ({
  type: types.SET_MEAL_DONE_STARTED
});

export const setMealDoneError = (error) => ({
  type: types.SET_MEAL_DONE_ERROR,
  error
});

export const setMealDoneSuccess = (mealInfo) => ({
  type: types.SET_MEAL_DONE_SUCCESS,
  payload: mealInfo
});

export const setMealDone = (mealInfoId, userToken) => dispatch => {
  dispatch(setMealDoneStarted());

  $post(`${SERVER_URL}/meal-info/${mealInfoId}/setDone`, undefined, addAuthHeader(userToken))
    .then((res) => {
      if (res.status >= 400)
        return dispatch(setMealDoneError(null));

      dispatch(setMealDoneSuccess(res.data));
    })
    .catch((err) => dispatch(setMealDoneError(err)));
}

export const setDrinkDoneStarted = () => ({
  type: types.SET_DRINK_DONE_STARTED
});

export const setDrinkDoneError = (error) => ({
  type: types.SET_DRINK_DONE_ERROR,
  error
});

export const setDrinkDoneSuccess = (drinkInfo) => ({
  type: types.SET_DRINK_DONE_SUCCESS,
  payload: drinkInfo
});

export const setDrinkDone = (drinkInfoId, userToken) => dispatch => {
  dispatch(setDrinkDoneStarted());

  $post(`${SERVER_URL}/drink-info/${drinkInfoId}/setDone`, undefined, addAuthHeader(userToken))
    .then((res) => {
      if (res.status >= 400)
        return dispatch(setDrinkDoneError(null));

      dispatch(setDrinkDoneSuccess(res.data));
    })
    .catch((err) => dispatch(setDrinkDoneError(err)));
}