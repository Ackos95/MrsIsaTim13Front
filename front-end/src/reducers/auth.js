import { Record } from 'immutable';

import * as types from '../constants';

const Auth = new Record({
  id: 'test',
  user: {
    name: "Acko",
    password: "password"
  }
});

const initialState = new Auth();

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_NAME:
      console.log('HERE with action USER_NAME', action);
      return state;

    default:
      return state;
  }
}

export default authReducer;