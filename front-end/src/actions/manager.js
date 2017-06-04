import * as types from '../constants';

import { SERVER_URL } from '../config';

import { $post, getToken, addAuthHeader } from '../utils/http';
//
export const addEmployeeStart = () => ({
  type: types.ADD_EMPLOYEE_STARTED
});

export const addEmployeeError = () => ({
  type: types.ADD_EMPLOYEE_ERROR
});

export const addEmployeeSuccess = ( createdEmployee ) => ({
  type: types.ADD_EMPLOYEE_SUCCESS,
  payload: { createdEmployee }
});

// first, last name, email, userName, password, type, sizes..
export const addEmployee = ({ f, l, e, u, p, t, shoe, shirt }) => dispatch => {
  dispatch(addEmployeeStart());

  $post(`${SERVER_URL}/manager/registration-request`,
    {
      firstName: f,
      lastName: l,
      email: e,
      userName: u,
      password: p,
      employeeType: t,
      shirtSize: shirt,
      shoeSize: shoe
    }, addAuthHeader(getToken('test', 'password')))
    .then((res) => {
      // here will go if (res.status > 400) dispatch(loginError());

      const { data } = res;
      return dispatch(addEmployeeSuccess({
        id: data.id,
        email: data.email,
        userName: data.userName,
        token: getToken('test', 'password'),
        firstName: data.firstName,
        lastName: data.lastName
      }))
    })
    .catch((err) => {
      return dispatch(addEmployeeError());
    });
}