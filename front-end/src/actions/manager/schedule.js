import * as types from '../../constants/index';

import { SERVER_URL } from '../../config';

import { $put, $delete, $post, $get, addAuthHeader } from '../../utils/http';

import { descriptionFromEmployee } from '../../utils';


/**** ADD ****/
export const addTerminStarted = () => ({
  type: types.ADD_TERMIN_STARTED
});
export const addTerminSuccess = (createdTermin) => ({
  type: types.ADD_TERMIN_SUCCESS,
  payload: { createdTermin }
});
export const addTerminError = () => ({
  type: types.ADD_TERMIN_ERROR
});

export const addTermin = (newTermin, token, scheduleId) => dispatch => {
  dispatch(addTerminStarted());
  console.log(newTermin, token, scheduleId);

  $post(`${SERVER_URL}/schedule/${scheduleId}/items`, newTermin, addAuthHeader(token))
  .then((res) => {
    // here will go if (res.status > 400) dispatch(__Error());

    const { data } = res;
    console.log('data');
    console.log(data);

    return dispatch(addTerminSuccess({
      id: data.id,
      employee: data.employee,
      reon: data.reon,
      start: new Date(data.start),
      end: new Date(data.end),
      title: descriptionFromEmployee(data.employee, data.reon)
    }))
  })
    .catch((err) => {
      console.log('err');
      console.log(err);
      return dispatch(addTerminError());
    });
};
/**** ADD END ****/

/*** DELETE ***/
export const deleteTerminStarted = () => ({
  type: types.DELETE_TERMIN_STARTED
});
export const deleteTerminSuccess = (deletedItemId) => ({
  type: types.DELETE_TERMIN_SUCCESS,
  payload: deletedItemId // već je payload.deletedItemId
});
export const deleteTerminError = (err) => ({
  type: types.DELETE_TERMIN_ERROR,
  payload: { err }
});

export const deleteTermin = (id, token) => dispatch => {
  dispatch(deleteTerminStarted());
  console.log('id, token');
  console.log(id, token);

  $delete(`${SERVER_URL}/schedule/items/${id}`,
    addAuthHeader(token)
  )
    .then((res) => {
      if (res.status > 400)
      {
        console.log(res.statusText);
        dispatch(deleteTerminError());
      }

      const { data } = res;
      console.log("deleted data ~ id TERMINA?");
      console.log(data);

      if (data === -1)
        return dispatch(deleteTerminError());

      return dispatch(deleteTerminSuccess({
        deletedItemId: data
      }));
    })
    .catch((err) => {
      console.log('err');
      console.log(err);
      return dispatch(deleteTerminError(err));
    });
};
/**** DELETE END ****/

/*** UPDATE ***/
export const updateTerminStarted = () => ({
  type: types.UPDATE_TERMIN_STARTED
});
export const updateTerminSuccess = (updatedTermin) => ({
  type: types.UPDATE_TERMIN_SUCCESS,
  payload: { updatedTermin }
});
export const updateTerminError = () => ({
  type: types.UPDATE_TERMIN_ERROR
});

export const updateTermin = (itemToUpdate, token) => dispatch => {
  dispatch(updateTerminStarted());
  console.log();
  $put(`${SERVER_URL}/schedule/items/${itemToUpdate.id}`, itemToUpdate, addAuthHeader(token))
    .then((res) => {
      if (res.status > 400)
      {
        dispatch(updateTerminError());
        console.log(res.statusText);
      }

      const { data } = res;
      console.log("updateItem data");
      console.log(data);

      return dispatch(updateTerminSuccess({
        updatedItem: data
      }));
    })
    .catch((err) => {
      console.log('err');
      console.log(err);
      return dispatch(updateTerminError());
    });
};



/**** LOADING.... ***/
export const loadScheduleStarted = () => ({
  type: types.LOAD_SCHEDULE_STARTED
});
export const loadScheduleSuccess = (loadedSchedule) => ({
  type: types.LOAD_SCHEDULE_SUCCESS,
  payload: loadedSchedule // vec je payload.schedule
});
export const loadScheduleError = () => ({
  type: types.LOAD_SCHEDULE_ERROR
});

export const loadSchedule = (restaurantId, token) => dispatch => {
  dispatch(loadScheduleStarted());

  // $get(`${SERVER_URL}/restaurant/schedule`, null, addAuthHeader(token))
  $get(`${SERVER_URL}/restaurant/${restaurantId}/schedule`, undefined, addAuthHeader(token))
    .then((res) => {
      // here will go if (res.status > 400) dispatch(__Error());
      console.log('res');
      console.log(res);

      const { data } = res;
      data.scheduleItems.forEach(function (item) {
        item.start = new Date(item.start); item.end = new Date(item.end);
        // item['desc'] = descriptionFromEmployee(item.employee, item.reon);
        item['title'] = descriptionFromEmployee(item.employee, item.reon);
      });
      return dispatch(loadScheduleSuccess({schedule: data}))
    })
    .catch((err) => {
      console.log('err');
      console.log(err);
      return dispatch(loadScheduleError());
    });
};

export const loadEmployeesStarted = () => ({
  type: types.LOAD_EMPLOYEES_STARTED
});
export const loadEmployeesSuccess = (employees) => ({
  type: types.LOAD_EMPLOYEES_SUCCESS,
  payload: employees // vec je payload.employees = []
});
export const loadEmployeesError = () => ({
  type: types.LOAD_EMPLOYEES_ERROR
});

export const loadEmployees = (token) => dispatch => {
  dispatch(loadEmployeesStarted());

  $get(`${SERVER_URL}/restaurant/employees`,
    null, addAuthHeader(token))
    .then((res) => {
      // here will go if (res.status > 400) dispatch(__Error());
      console.log('res');
      console.log(res);

      const { data } = res;
      return dispatch(loadEmployeesSuccess({employees: data}))
    })
    .catch((err) => {
      console.log('err');
      console.log(err);
      return dispatch(loadEmployeesError());
    });
};

export const selectScheduleItem = (selectedItem) => ({
  type: types.SELECT_SCHEDULE_ITEM,
  payload: { selectedItem } // payload.selectedItem
});