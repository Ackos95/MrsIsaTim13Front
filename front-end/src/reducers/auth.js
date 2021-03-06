import { Record } from 'immutable';
import cloneDeep from 'lodash/cloneDeep';

import { getToken } from '../utils/http';

import * as types from '../constants';

const Auth = new Record({
  user: JSON.parse(localStorage.getItem('user')) || {
    id: null,
    email: null,
    userName: null,
    token: null,
    firstName: null,
    lastName: null,
    roles: [],  // { id: <long>, name: <string> },
    restaurant: null,
    changedPassword: false,
  },
  inProgress: false,
  passwordChanged: false,
	errorMessage: null,
	confirmedRegistration : false
});

const initialState = new Auth();

const authReducer = (state = initialState, action) => {
  switch (action.type) {

		case types.EDIT_INFO: {
      const newUser = { ...state.user, ...action.payload };
      
      localStorage.setItem('user', JSON.stringify(newUser));
      return state.set('user', newUser);

      // return state.set('user', {id: action.payload.id, email: action.payload.email, userName: action.payload.userName,
      //   token: state.user.token, firstName: action.payload.firstName, lastName: action.payload.lastName });      
    }

    case types.CHANGE_PASSWORD_STARTED:
      return state.set('passwordChanged', false);

    case types.CHANGE_PASSWORD_SUCCESS: {
      const user = { ...state.user, changedPassword: true, token: getToken(state.user.userName, action.payload.password) }

      localStorage.setItem('user', JSON.stringify(user));
      return state.set('user', user).set('passwordChanged', true);
    }
		
    case types.LOGIN_SUCCESS:
      // store token into storage so it doesn't disapear when page is refreshed
      localStorage.setItem('user', JSON.stringify(action.payload.user));

      return state.set('user', action.payload.user).set('inProgress', false);

    case types.LOGIN_ERROR:
      return state.set('inProgress', false);

    case types.LOGIN_STARTED:
      return state.set('inProgress', true);
	
    case types.LOGOUT:
      localStorage.removeItem('user');
      return state.set('user', {
        id: null,
        email: null,
        userName: null,
        token: null,
        firstName: null,
        lastName: null,
        roles: [],  // { id: <long>, name: <string> },
        restaurant: null,
        changedPassword: true,
      });
      
		case types.REGISTRATION_SUCCESS: {
			console.log(action.payload);
			return state.set('errorMessage', action.payload.errorMessage)
				.set('inProgress', false);
		}
		
		case types.REGISTRATION_ERROR:
			return state.set('inProgress', false)
									.set('errorMessage', action.payload.errorMessage);
	
		case types.REGISTRATION_STARTED:
			return state.set('inProgress', true);
	
		case types.REGISTRATION_CONFIRMATION_SUCCESS: {
			console.log("REGISTRATION_CONFIRMATION_SUCCESS REGISTRATION_CONFIRMATION_SUCCESS");
			console.log(action.payload);
			return state.set('user', action.payload)
				.set('inProgress', false)
				.set('confirmedRegistration', true);
		}
	
		case types.REGISTRATION_CONFIRMATION_ERROR:
			return state.set('inProgress', false)
				.set('errorMessage', action.payload.errorMessage)
				.set('confirmedRegistration', false);
	
		case types.REGISTRATION_CONFIRMATION_STARTED:
			return state.set('inProgress', true)
									.set('confirmedRegistration', false);
	
	
		case types.CHANGE_NAME:
      return cloneDeep(state.set('user', { ...state.user, name: action.payload.name }));

    default:
      return state;
  }
};

export default authReducer;