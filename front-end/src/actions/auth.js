import * as types from '../constants';

import { get } from '../utils/http';

export const loginSuccess = ({ email, password }) => ({
  type: types.LOGIN_SUCCESS,
  payload: { email, password }
});

export const loginError = () => ({
  type: types.LOGIN_ERROR
});

export const loginStart = () => ({
  type: types.LOGIN_STARTED
})

export const login = ({ email, password }) => dispatch => {
  dispatch(loginStart());

  get('https://api.rescuegroups.org/http/')
  .then((res) => {
    console.log(res);
    return dispatch(loginSuccess({ email, password }));
  })
  .catch((err) => { 
    alert(err);
    return dispatch(loginError());
  });
}