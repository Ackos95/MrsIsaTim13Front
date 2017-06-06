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
        token: getToken('m2', 'password'), // state.auth.user.token <--- OVDJE JE
        firstName: data.firstName,
        lastName: data.lastName
      }))
    })
    .catch((err) => {
      console.log('err');
      console.log(err);
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


export const addSupplier = ({ values }) => dispatch => {
  dispatch(addSupplierStart());

  console.log('values ~ tu je i token~');
  console.log(values); // tu je i token

  $post(`${SERVER_URL}/manager/supplier-addition`,
    {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      userName: values.userName,
      password: values.password
    }, addAuthHeader(values.token)) // Bilo >>> getToken('m2', 'password')
    .then((res) => {
      // here will go if (res.status > 400) dispatch(loginError());

      const { data } = res;
      return dispatch(addSupplierSuccess({
        id: data.id,
        email: data.email,
        userName: data.userName,
        token: values.token, // getToken('m2', 'password') // treba li mi ovdje?? NE!?
        firstName: data.firstName,
        lastName: data.lastName
      }))
    })
    .catch((err) => {
      console.log('err');
      console.log(err);
      return dispatch(addSupplierError());
    });
};


/**
 * Supply request
 */
export const addSupplyRequestStart = () => ({
  type: types.ADD_SUPPLY_REQUEST_STARTED
});

export const addSupplyRequestError = () => ({
  type: types.ADD_SUPPLY_REQUEST_ERROR
});

export const addSupplyRequestSuccess = ( createdRequest ) => ({
  type: types.ADD_SUPPLY_REQUEST_SUCCESS,
  payload: { createdRequest }
});


export const addSupplyRequest = ({ values }) => dispatch => {
  dispatch(addSupplyRequestStart());

  console.log('values');
  console.log(values);

  // prepare values for sending
  // iterate: https://weblog.west-wind.com/posts/2017/Mar/04/Getting-JavaScript-Properties-for-Object-Maps-by-Index-or-Name
  let items= []; // supplyItems
  Object.keys(values).forEach(function (prop) {
    console.log(values[prop]);
    if (prop[0] === 'i') {
      console.log('item je');

      console.log(values[prop]['unit']);
      if (values[prop]['unit'] === undefined)
        values[prop]['unit'] = 'KG';
      items.push(values[prop]);
    }
  });

  $post(`${SERVER_URL}/supplies/request`,
    {
      supplyItems: items,
      ended: false,
      restaurant: null,
      token: values['token']
    }, addAuthHeader(values.token))
    .then((res) => {
      // here will go if (res.status > 400) dispatch(loginError());

      const { data } = res;
      return dispatch(addSupplyRequestSuccess({
        id: data.id,
        dateFrom: data.publishingDate,
        dateTo: data.endingDate,
        ended: data.ended,
        restaurant: data.restaurant
      }))
    })
    .catch((err) => {
      console.log('err');
      console.log(err);
      return dispatch(addSupplyRequestError());
    });
};