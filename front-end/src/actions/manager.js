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

export const addEmployeeSuccess = ( created ) => ({
  type: types.ADD_EMPLOYEE_SUCCESS,
  payload: { created }
});

//  [[[ user koji dodaje ]]]  ???
export const addEmployee = ({ firstName, lastName, email, userName, password, employeeType, shirtSize, shoeSize }) => dispatch => {
  dispatch(addEmployeeStart());

  console.log('parametri: ' + firstName + ' ' + lastName + ' empType: ' + employeeType);

  $post(`${SERVER_URL}/manager/registration-request`,
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      userName: userName,
      password: password,
      employeeType: employeeType,
      shirtSize: shirtSize,
      shoeSize: shoeSize
    }, addAuthHeader(getToken('m2', 'password'))) // ako bi se dobijao u addEmployee >>> user.userName, user.password
    .then((res) => {
      // here will go if (res.status > 400) dispatch(loginError());

      const { data } = res;
      return dispatch(addEmployeeSuccess({
        id: data.id,
        email: data.email,
        userName: data.userName,
        token: getToken('m2', 'password'),
        firstName: data.firstName,
        lastName: data.lastName
      }))
    })
    .catch((err) => {
      return dispatch(addEmployeeError());
    });
};

export const addSupplierStart = () => ({
  type: types.ADD_SUPPLIER_STARTED
});

export const addSupplierError = () => ({
  type: types.ADD_SUPPLIER_ERROR
});

export const addSupplierSuccess = ( created ) => ({
  type: types.ADD_SUPPLIER_SUCCESS,
  payload: { created }
});


export const addSupplier = ({ firstName, lastName, email, userName, password }) => dispatch => {
  dispatch(addSupplierStart());

  console.log('parametri: ' + firstName + ' ' + lastName + ' userName: ' + userName);

  $post(`${SERVER_URL}/manager/supplier-addition`,
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      userName: userName,
      password: password
    }, addAuthHeader(getToken('m2', 'password'))) // ako bi se dobijao u addEmployee >>> user.userName, user.password
    .then((res) => {
      // here will go if (res.status > 400) dispatch(loginError());

      const { data } = res;
      return dispatch(addSupplierSuccess({
        id: data.id,
        email: data.email,
        userName: data.userName,
        token: getToken('m2', 'password'),
        firstName: data.firstName,
        lastName: data.lastName
      }))
    })
    .catch((err) => {
      return dispatch(addSupplierError());
    });
};