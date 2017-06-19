import * as types from '../constants/index';

import { SERVER_URL, TABLE_SIZE } from '../config';

import { $get, $post, addAuthHeader } from '../utils/http';

/** sve za konfiguraciju stolova **/

export const sendTableConfigStart = () => ({
  type: types.SEND_TABLE_CONFIG_STARTED
});

export const sendTableConfigError = () => ({
  type: types.SEND_TABLE_CONFIG_ERROR
});

export const sendTableConfigSuccess = ( sentConfig ) => ({
  type: types.SEND_TABLE_CONFIG_SUCCESS,
  payload: { sentConfig } // { sentConfig: sentConfig }
});


/** TableConfig local updates **/
export const updateColorIndex = (colorIndex) => ({
  type: types.UPDATE_COLOR_INDEX,
  payload: { colorIndex }
});

export const updateChairCount = (chairCount) => ({
  type: types.UPDATE_CHAIR_COUNT,
  payload: {chairCount}
});

export const updateOneTable = (id, x, y) => ({
  type: types.UPDATE_ONE_TABLE,
  payload: { id, x, y } //
});

export const selectTable = (id) => ({
  type: types.SELECT_TABLE,
  payload: id // već stiže kao objekat - pogledaj Tables.jsx : 70
});

/** GET TABLES **/

export const getTablesStarted = () => ({
  type: types.GET_TABLES_STARTED
});
export const getTablesSuccess = (tables) => ({
  type: types.GET_TABLES_SUCCESS,
  payload: tables // { tables: tables } !!
});
export const getTablesError = () => ({
  type: types.GET_TABLES_ERROR
});

export const getTables = (token) => dispatch => {
  dispatch(getTablesStarted());

  $get(`${SERVER_URL}/restaurant/table-config`, null, addAuthHeader(token))
    .then((res) => {

      console.log('getTables \'res\'');
      console.log(res);

      if (res.status > 400) dispatch(getTablesError());

      const { data } = res;
      console.log('actions/tables/getTables(token) \'data\'');
      console.log(data);

      return dispatch(getTablesSuccess({
        tables: data.tables
      }));
    })
    .catch((err) => {
      console.log('err');
      console.log(err);
      return dispatch(getTablesError());
    });
};

export const sendTableConfig = ({ firstName, lastName, email, userName, password, passwordConfirmation }) => dispatch => {
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

/** TABLE ADDITION & DELETION **/

export const addTable = () => ({
  type: types.ADD_TABLE,
  payload: {
    newTable: {
      width: TABLE_SIZE,
      height: TABLE_SIZE,
      x: 30, y: 30 // ID postavljamo u reduceru!
    }
  }
});

export const deleteTable = () => ({
  type: types.DELETE_TABLE
});