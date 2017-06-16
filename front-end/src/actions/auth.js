import * as types from '../constants';
import { SERVER_URL } from '../config';

import { $get, $post, getToken, addAuthHeader } from '../utils/http';

export const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: { user }
});

export const loginError = () => ({
  type: types.LOGIN_ERROR
});

export const loginStart = () => ({
  type: types.LOGIN_STARTED
});

export const login = ({ userName, password }) => dispatch => {
  dispatch(loginStart());

  console.log("\n Login poceo >  > TOKEN");
	console.log("\nuserName: " +  userName);
	console.log("\npassword: " +  password);
  console.log(getToken(userName, password));
  
  $get(`${SERVER_URL}/users/check-login`, null, addAuthHeader(getToken(userName, password)))
  .then((res) => {
    // here will go if (res.status > 400) dispatch(loginError());

    const { data } = res;
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
};



export const registrationSuccess = (successObject) => ({
	type: types.REGISTRATION_SUCCESS,
	payload: successObject
});

export const registrationError = (err) => ({
	type: types.REGISTRATION_ERROR,
	payload: err
});

export const registrationStart = () => ({
	type: types.REGISTRATION_STARTED
});

export const register = ({ firstName, lastName, email, userName, password, passwordConfirmation }) => dispatch => {
	dispatch(registrationStart());
	
	console.log(" register auth.js  stiglo sve");
	console.log(firstName, lastName, email, userName, password, passwordConfirmation);
	console.log(" register auth.js  stiglo sve");
	
	let registeringUser = { firstName: firstName, lastName: lastName, email: email,
		userName: userName, password: password, passwordConfirmation: passwordConfirmation };
	
	$post(`${SERVER_URL}/registration/guest`, registeringUser)
		.then((res) => {
			if (res.status > 400) dispatch(
				registrationError({errorMessage : "status > 400", errorStatusText : res.statusText}));
			
			const { data } = res;
			console.log("data register data"); console.log(data); console.log("data register data");
			
			if (data!=='success') {
				let realErrors = data.split(';');
				console.log(realErrors);
				console.log(realErrors.length);
				let badEmail;
				let badUsername;
				if (realErrors.length > 1) {
					badEmail = realErrors[0];
					badUsername = realErrors[1];
				}
				
				return dispatch(registrationError(
					{errorMessage: 'Sljedeća polja su zauzeta: ' + badEmail + ', ' + badUsername + '.'} ) );
			}
			
			return dispatch(registrationSuccess({
				errorMessage: data // bice 'success'
			}));
		})
		.catch((err) => {
		
			return dispatch(registrationError(err));
		});
};
 

 export const registrationConfirmationSuccess = (user) => ({
 type: types.REGISTRATION_CONFIRMATION_SUCCESS,
 payload: user
 });

 export const registrationConfirmationError = (err) => ({
 type: types.REGISTRATION_CONFIRMATION_ERROR,
 payload: err
 });

 export const registrationConfirmationStart = () => ({
 type: types.REGISTRATION_CONFIRMATION_STARTED
 });

 export const registrationConfirmation = ({ email, token }) => dispatch => {
	 dispatch(registrationConfirmationStart());

	 console.log(" registrationConfirmation auth.js  stiglo sve");
	 console.log(email, token);
	 console.log(" registrationConfirmation auth.js  stiglo sve");

	 email = email.substring(0, email.length - 4);
		let emailToken = email + '__' + token ;
	 $get(`${SERVER_URL}/registration/confirm/guest=` + emailToken, null, null)
		 .then((res) => {
			 if (res.status > 400) dispatch(
				 registrationConfirmationError({errorMessage : "status > 400", errorStatusText : res.statusText}));

			 console.log("data confirmRegistration data"); console.log(res); console.log("data confirmRegistration data");

			 if (res.data===null || res.data===undefined || res.data==='')
			 	 return dispatch(registrationConfirmationError({errorMessage: res}));
			
			 return dispatch(registrationConfirmationSuccess( {
					 id: res.data.id,
					 email: res.data.email,
					 userName: res.data.userName,
					 token: null,
					 firstName: res.data.firstName,
					 lastName: res.data.lastName} )
			 );
	 })
	 .catch((err) => {
		 return dispatch(registrationConfirmationError(err));
	 });
 };