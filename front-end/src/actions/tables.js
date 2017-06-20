import * as types from '../constants/index';

import { SERVER_URL, TABLE_SIZE } from '../config';

import { $delete, $get, $post, $put, addAuthHeader } from '../utils/http';

/** sve za konfiguraciju stolova **/


/** TableConfig local updates **/
export const updateColorIndex = (colorIndex) => ({
  type: types.UPDATE_COLOR_INDEX,
  payload: { colorIndex }
});

export const updateChairCount = (chairCount) => ({
  type: types.UPDATE_CHAIR_COUNT,
  payload: {chairCount}
});

export const selectTable = (id) => ({
  type: types.SELECT_TABLE,
  payload: id // već stiže kao objekat - pogledaj Tables.jsx : 70
});


//// ovo mora posebno kao i delete i add !!!
export const updateOneTable = (id, x, y) => ({
  type: types.UPDATE_ONE_TABLE,
  payload: { id, x, y } //
});

export const updateTableStarted = () => ({
  type: types.UPDATE_TABLE_STARTED
});
export const updateTableSuccess = (updatedTable) => ({
  type: types.UPDATE_TABLE_SUCCESS,
  payload: updatedTable // note the 'd' in updateD
});
export const updateTableError = () => ({
  type: types.UPDATE_TABLE_ERROR
});

export const updateTable = (tableToUpdate, token) => dispatch => {
  dispatch(updateTableStarted());
  console.log('UPDATE sto!');
  console.log(tableToUpdate, token);

  $put(`${SERVER_URL}/table-configs/table/${tableToUpdate.id}`, tableToUpdate, addAuthHeader(token))
    .then((res) => {
      if (res.status > 400)
      {
        dispatch(updateTableError());
        console.log(res.statusText);
      }

      const { data } = res;
      console.log("addTable data");
      console.log(data);

      return dispatch(updateTableSuccess ({
        updatedTable: data
      }));
    })
    .catch((err) => {
      console.log('err');
      console.log(err);
      return dispatch(updateTableError());
    });

};


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

  // uzima konfiguraicju preko ulogovanog korisnika
  $get(`${SERVER_URL}/table-configs`, null, addAuthHeader(token))
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


export const sendTableConfigStart = () => ({
  type: types.SEND_TABLE_CONFIG_STARTED
});

export const sendTableConfigError = () => ({
  type: types.SEND_TABLE_CONFIG_ERROR
});

export const sendTableConfigSuccess = ( sentConfig ) => ({
  type: types.SEND_TABLE_CONFIG_SUCCESS,
  payload: sentConfig // već je { sentConfig: sentConfig }
});

export const sendTableConfig = ( tables, token ) => dispatch => {
  dispatch(sendTableConfigStart());

  console.log(" send config stigli stolovi");
  console.log(tables);

  $post(`${SERVER_URL}/table-configs`, { tables: tables }, addAuthHeader(token))
    .then((res) => {
      if (res.status > 400) dispatch(
        sendTableConfigError({errorMessage : "status > 400", errorStatusText : res.statusText}));

      const { data } = res;
      console.log("gotUpdated data");
      console.log(data);

      return dispatch(sendTableConfigSuccess({
        sentConfig: data // bice 'success'
      }));
    })
    .catch((err) => {
      console.log('err');
      console.log(err);
      return dispatch(sendTableConfigError(err));
    });
};
export const updateDone = () => ({
  type: types.SUCCESSFUL_UPDATE_DONE
});

/** TABLE ADDITION & DELETION **/

/*** **** ADD **** **/

export const addTableStarted = () => ({
  type: types.ADD_TABLE_STARTED
});
export const addTableSuccess = (newTable) => ({
  type: types.ADD_TABLE_SUCCESS,
  payload: newTable // vec je payload.newTable!
});
export const addTableError = () => ({
  type: types.ADD_TABLE_ERROR
});

export const addTable = (reon, chairCount, token) => dispatch => {
  dispatch(addTableStarted());
  console.log('NOVI STO!');
  console.log(reon, chairCount, token);

  const newTable = {
    width: TABLE_SIZE, height: TABLE_SIZE,
    x: 30, y: 30,
    reon: reon,
    chairCount: chairCount
  };
  $post(`${SERVER_URL}/table-configs/table`, newTable, addAuthHeader(token))
    .then((res) => {
      if (res.status > 400)
      {
        dispatch(addTableError());
        console.log(res.statusText);
      }

      const { data } = res;
      console.log("addTable data");
      console.log(data);

      return dispatch(addTableSuccess ({
        newTable: data // bice 'success'
      }));
    })
    .catch((err) => {
      console.log('err');
      console.log(err);
      return dispatch(sendTableConfigError());
    });

};


/*** **** DELETE **** **/

export const deleteTableStarted = () => ({
  type: types.DELETE_TABLE_STARTED
});

export const deleteTableSuccess = (deletedId) => ({
  type: types.DELETE_TABLE_SUCCESS,
  payload: deletedId // vec je { deletedId : id ili -1 ! }
});

export const deleteTableError = () => ({
  type: types.DELETE_TABLE_ERROR
});

export const deleteTable = (id, token) => dispatch => {
  dispatch(deleteTableStarted());

  console.log('id, token');
  console.log(id, token);

  $delete(`${SERVER_URL}/table-configs/table/${id}`,
    addAuthHeader(token)
  )
    .then((res) => {
      if (res.status > 400)
      {
        console.log(res.statusText);
        dispatch(deleteTableError());
      }

      const { data } = res;
      console.log("deleted data ~ id stola?");
      console.log(data);

      if (data === -1 || data == -1) // sta pisem.. <3 JS <3
        return dispatch(deleteTableError());

      return dispatch(deleteTableSuccess({
        deletedId: data
      }));
    })
    .catch((err) => {
      console.log('err');
      console.log(err);
      return dispatch(deleteTableError(err));
    });
};