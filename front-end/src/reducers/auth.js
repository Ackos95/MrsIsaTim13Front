import { Record } from 'immutable';
import cloneDeep from 'lodash/cloneDeep';

import * as types from '../constants';

const Auth = new Record({
  user: {
    id: null,
    email: null,
    userName: null,
    token: null,
    firstName: null,
    lastName: null,
  },
  inProgress: false
});

const initialState = new Auth();

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.LOGIN_SUCCESS:
      // store token into storage so it doesn't disapear when page is refreshed
      // localStorage.setItem('token', action.payload.user.token);

      return state.set('user', action.payload.user).set('inProgress', false);

    case types.LOGIN_ERROR:
      return state.set('inProgress', false);

    case types.LOGIN_STARTED:
      return state.set('inProgress', true);

    case types.CHANGE_NAME:
      return cloneDeep(state.set('user', { ...state.user, name: action.payload.name }));

    default:
      return state;
  }
}

export default authReducer;