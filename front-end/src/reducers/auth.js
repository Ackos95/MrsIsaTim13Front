import { Record } from 'immutable';

import * as types from '../constants';

const Auth = new Record({
  user: null,
});

const initialState = new Auth();

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.LOGIN_SUCCESS:
      return state.set('user', action.payload);

    case types.CORS_SUCCESS:
    {
      console.log('iz cors reducera SUCCESS');
      return state.set('user', action.payload);
    }

    case types.CORS_ERROR:
    {
      console.log('iz cors reducera ERROR');
      return state.set('user', action.payload);
    }

    default:
      return state;
  }
}

export default authReducer;