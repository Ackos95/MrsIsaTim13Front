import * as types from '../../constants/index';

import { SERVER_URL } from '../../config';

import { $get, addAuthHeader } from '../../utils/http';

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

export const addTermin = (newTermin) => dispatch => {
  dispatch(addTerminStarted());
  console.log(newTermin);
  
};

export const deleteTerminStarted = () => ({
  type: types.DELETE_TERMIN_STARTED
});
export const deleteTerminSuccess = (deletedTerminId) => ({
  type: types.DELETE_TERMIN_SUCCESS,
  payload: { deletedTerminId }
});
export const deleteTerminError = () => ({
  type: types.DELETE_TERMIN_ERROR
});

export const deleteTermin = (id, token) => dispatch => {
  dispatch(deleteTerminStarted());
  console.log(id, token);
  
};


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

export const loadSchedule = (token) => dispatch => {
  dispatch(loadScheduleStarted());

  $get(`${SERVER_URL}/restaurant/schedule`,
    null, addAuthHeader(token))
    .then((res) => {
      // here will go if (res.status > 400) dispatch(__Error());
      console.log('res');
      console.log(res);

      const { data } = res;
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


