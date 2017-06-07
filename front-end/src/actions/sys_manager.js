import * as types from '../constants';

import { SERVER_URL } from '../config';

import { $post, addAuthHeader } from '../utils/http';


// ADD RESTAURANT MANAGER

export const addResManagerStart = () => ({
  type: types.ADD_RES_MANAGER_STARTED
});

export const addResManagerError = () => ({
  type: types.ADD_RES_MANAGER_ERROR
});

export const addResManagerSuccess = ( createdManager ) => ({
  type: types.ADD_RES_MANAGER_SUCCESS,
  payload: { createdManager }
});

export const addResManager = ({ user }) => dispatch => {
  dispatch(addResManagerStart());
  // token, firstName, lastName, email, userName, password, createdFor
  console.log('parametri: ' + user.firstName + ' ' + user.lastName + ' createdFor: ' + user.createdFor);

  $post(`${SERVER_URL}/system-manager/registration-request`,
    {
      firstName: user.firstName, // ima li veze što je za SysMan-a ovo null?
      lastName: user.lastName,   // ima li veze što je za SysMan-a ovo null?
      email: user.email,
      userName: user.userName,
      password: user.password,
      createdFor: 'O B A V E Z N O!  O B A V E Z N O!  1 ili 2   O B A V E Z N O !!!'
    }, addAuthHeader(user.token))
    .then((res) => {
      // here will go if (res.status > 400) dispatch(__Error());

      const { data } = res;
      return dispatch(addResManagerSuccess({
        id: data.id,
        email: data.email,
        userName: data.userName,
        firstName: data.firstName, // ima li veze što je za SysMan-a ovo null?
        lastName: data.lastName    // ima li veze što je za SysMan-a ovo null?
      }))
    })
    .catch((err) => {
      console.log('err');
      console.log(err);
      return dispatch(addResManagerError());
    });
};


// ADD SYSTEM MANAGER

export const addSysManagerStart = () => ({
  type: types.ADD_SYS_MANAGER_STARTED
});

export const addSysManagerError = () => ({
  type: types.ADD_SYS_MANAGER_ERROR
});

export const addSysManagerSuccess = ( createdManager ) => ({
  type: types.ADD_SYS_MANAGER_SUCCESS,
  payload: { createdManager }
});

export const addSysManager = ({ user }) => dispatch => {
  dispatch(addSysManagerStart());
  console.log('addSysManager');
};


// ADD RESTAURANT

export const addRestaurantStart = () => ({
  type: types.ADD_SYS_MANAGER_STARTED
});

export const addRestaurantError = () => ({
  type: types.ADD_SYS_MANAGER_ERROR
});

export const addRestaurantSuccess = ( createdRestaurant ) => ({
  type: types.ADD_SYS_MANAGER_SUCCESS,
  payload: { createdRestaurant }
});

export const addRestaurant = ({ restaurant }) => dispatch => {
  dispatch(addRestaurantStart());
  console.log('addRestaurant');
};


// FUNCTION_NAME
