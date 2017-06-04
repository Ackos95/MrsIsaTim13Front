import * as types from '../constants';
import { SERVER_URL } from '../config';

import { $get, getToken, addAuthHeader } from '../utils/http';

export const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: { user }
});

export const loginError = () => ({
  type: types.LOGIN_ERROR
});

export const loginStart = () => ({
  type: types.LOGIN_STARTED
})

export const login = ({ userName, password }) => dispatch => {
  dispatch(loginStart());

  $get(`${SERVER_URL}/users/check-login`, null, addAuthHeader(getToken(userName, password)))
  .then((res) => {
    // here will go if (res.status > 400) dispatch(loginError());

    const { data } = res
    return dispatch(loginSuccess({
      id: data.id,
      email: data.email,
      userName: data.userName,
      token: getToken(userName, password),
      firstName: data.firstName,
      lastName: data.lastName
    }));
  })
  .catch((err) => { 
    return dispatch(loginError());
  });
}