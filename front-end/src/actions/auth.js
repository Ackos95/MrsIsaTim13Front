import * as types from '../constants';

import { get } from '../utils/http';

export const loginSuccess = ({ email, password }) => ({
  type: types.LOGIN_SUCCESS,
  payload: { email, password }
});

export const loginError = () => ({
  type: types.LOGIN_ERROR
});

export const loginStart = () => ({
  type: types.LOGIN_STARTED
});

/// cors dodatak
export const corsStart = () => ({
    type: types.CORS_STARTED
});

export const corsSuccess = ({ myData }) => ({
    type: types.CORS_SUCCESS,
    payload: { myData }
});

export const corsError = ({ myData }) => ({
    type: types.CORS_ERROR,
    payload: { myData }
});


export const login = ({ email, password }) => dispatch => {
  dispatch(loginStart());

  get('https://api.rescuegroups.org/http/')
  .then((res) => {
    console.log(res);
    return dispatch(loginSuccess({ email, password }));
  })
  .catch((err) => { 
    alert(err);
    return dispatch(loginError());
  });
};

// akcija CORS
export const testCors = ({ myData }) => dispatch => {
    dispatch(corsStart());

    get('http://localhost:8080/greeting')
        .then((res) => {
            console.log(res);
            return dispatch(corsSuccess({
                myData: myData,
                res: res }
            ));
        })
        .catch((err) => {
            alert(err);
            return dispatch(corsError({
                er: 'errMajData'
            }));
        });
};