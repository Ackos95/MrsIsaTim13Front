import * as types from '../constants/index';

import { SERVER_URL, TABLE_SIZE } from '../config';

import { $get, addAuthHeader } from '../utils/http';

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


/** TABLE ADDITION & DELETION **/

export const addTable = () => ({
  type: types.ADD_TABLE,
  payload: {
    newTable: {
      width: TABLE_SIZE,
      height: TABLE_SIZE,
      x: 30, y: 30
    }
  }
});

export const deleteTable = (tableId) => ({
  type: types.DELETE_TABLE,
  payload: { tableId } // da bi bilo ..."action.payload.tableId"
});